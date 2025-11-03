#!/usr/bin/env node

/**
 * سكريبت CLI لإنشاء روابط قصيرة بالجملة عبر GitHub Issues
 * 
 * CLI Script for bulk creating short URLs via GitHub Issues
 * 
 * Usage: node url-shortener-cli.js <xlsx-file-path>
 * Example: node url-shortener-cli.js urls-to-shorten.xlsx
 */

const { execSync } = require('child_process');
const fs = require('fs');
const XLSX = require('xlsx');

// Configuration - الإعدادات
const CONFIG = {
    REPO_OWNER: 'sherow1982',
    REPO_NAME: 'arabic-ads-calculator-tools',
    DELAY_MS: 500, // Delay between requests to avoid rate limiting
    MAX_URLS: 1000,
    CHUNK_SIZE: 50 // Process URLs in chunks
};

// Colors for console output - ألوان للعرض في الكونسول
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
    log(`❌ Error: ${message}`, 'red');
}

function logSuccess(message) {
    log(`✅ ${message}`, 'green');
}

function logInfo(message) {
    log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
    log(`⚠️  ${message}`, 'yellow');
}

// Check if GitHub CLI is installed
function checkGitHubCLI() {
    try {
        execSync('gh --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

// Check if user is authenticated with GitHub CLI
function checkGitHubAuth() {
    try {
        execSync('gh auth status', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

// Read URLs from XLSX file
function readUrlsFromXLSX(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        logInfo(`Reading XLSX file: ${filePath}`);
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        if (data.length === 0) {
            throw new Error('XLSX file is empty or has no data');
        }

        // Extract URLs from various possible column names
        const urls = data.map(row => {
            // Try different column name variations
            const url = row['original_url'] || 
                       row['Original URL'] || 
                       row['url'] || 
                       row['URL'] || 
                       row['الرابط الأصلي'] ||
                       row['الرابط'] ||
                       Object.values(row)[0]; // First column if no match
            
            return {
                url: typeof url === 'string' ? url.trim() : '',
                note: row['note'] || row['Note'] || row['ملاحظة'] || ''
            };
        }).filter(item => item.url && isValidUrl(item.url));

        logInfo(`Found ${urls.length} valid URLs in XLSX file`);
        return urls;

    } catch (error) {
        logError(`Failed to read XLSX file: ${error.message}`);
        process.exit(1);
    }
}

// Validate URL format
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Create a single GitHub issue for URL shortening
function createUrlIssue(url, note, index, total) {
    try {
        const title = url;
        const body = note ? `Note: ${note}\n\nCreated by URL Shortener CLI` : 'Created by URL Shortener CLI';
        
        // Escape quotes in title and body
        const escapedTitle = title.replace(/"/g, '\\"');
        const escapedBody = body.replace(/"/g, '\\"');
        
        const command = `gh issue create --repo ${CONFIG.REPO_OWNER}/${CONFIG.REPO_NAME} --title "${escapedTitle}" --body "${escapedBody}"`;
        
        log(`[${index}/${total}] Creating issue for: ${url.substring(0, 50)}${url.length > 50 ? '...' : ''}`, 'cyan');
        
        const result = execSync(command, { encoding: 'utf8' }).trim();
        
        // Extract issue number from the result URL
        const issueMatch = result.match(/\/(\d+)$/);
        const issueNumber = issueMatch ? issueMatch[1] : 'unknown';
        
        logSuccess(`Created issue #${issueNumber} -> ${url}`);
        
        return {
            original: url,
            issueNumber: issueNumber,
            shortUrl: `https://${CONFIG.REPO_OWNER}.github.io/${CONFIG.REPO_NAME}/${issueNumber}`,
            issueUrl: result,
            status: 'success'
        };
        
    } catch (error) {
        logError(`Failed to create issue for ${url}: ${error.message}`);
        return {
            original: url,
            issueNumber: null,
            shortUrl: null,
            issueUrl: null,
            status: 'failed',
            error: error.message
        };
    }
}

// Process URLs in chunks to avoid rate limiting
async function processUrlsInChunks(urls) {
    const results = [];
    const chunks = [];
    
    // Split URLs into chunks
    for (let i = 0; i < urls.length; i += CONFIG.CHUNK_SIZE) {
        chunks.push(urls.slice(i, i + CONFIG.CHUNK_SIZE));
    }
    
    logInfo(`Processing ${urls.length} URLs in ${chunks.length} chunks of ${CONFIG.CHUNK_SIZE}`);
    
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
        const chunk = chunks[chunkIndex];
        
        log(`\nProcessing chunk ${chunkIndex + 1}/${chunks.length}...`, 'magenta');
        
        for (let urlIndex = 0; urlIndex < chunk.length; urlIndex++) {
            const urlData = chunk[urlIndex];
            const globalIndex = chunkIndex * CONFIG.CHUNK_SIZE + urlIndex + 1;
            
            const result = createUrlIssue(urlData.url, urlData.note, globalIndex, urls.length);
            results.push(result);
            
            // Add delay between requests
            if (urlIndex < chunk.length - 1) {
                await new Promise(resolve => setTimeout(resolve, CONFIG.DELAY_MS));
            }
        }
        
        // Longer delay between chunks
        if (chunkIndex < chunks.length - 1) {
            logInfo(`Waiting 2 seconds before next chunk...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    return results;
}

// Generate results XLSX file
function generateResultsXLSX(results, originalFilePath) {
    try {
        const data = results.map((result, index) => ({
            '#': index + 1,
            'Original URL / الرابط الأصلي': result.original,
            'Short URL / الرابط القصير': result.shortUrl || '',
            'Issue Number / رقم القضية': result.issueNumber || '',
            'Status / الحالة': result.status,
            'Issue URL / رابط القضية': result.issueUrl || '',
            'Error / الخطأ': result.error || '',
            'Created Date / تاريخ الإنشاء': new Date().toISOString().split('T')[0]
        }));
        
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Results');
        
        const baseFileName = originalFilePath.replace(/\.[^/.]+$/, '');
        const resultsFileName = `${baseFileName}-results-${new Date().toISOString().split('T')[0]}.xlsx`;
        
        XLSX.writeFile(wb, resultsFileName);
        
        logSuccess(`Results saved to: ${resultsFileName}`);
        return resultsFileName;
        
    } catch (error) {
        logError(`Failed to generate results XLSX: ${error.message}`);
        return null;
    }
}

// Print summary statistics
function printSummary(results) {
    const successful = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'failed').length;
    
    log('\n' + '='.repeat(60), 'bright');
    log('📊 SUMMARY / ملخص', 'bright');
    log('='.repeat(60), 'bright');
    log(`Total URLs processed: ${results.length}`, 'blue');
    log(`✅ Successful: ${successful}`, 'green');
    log(`❌ Failed: ${failed}`, 'red');
    log(`Success rate: ${((successful / results.length) * 100).toFixed(1)}%`, 'cyan');
    
    if (successful > 0) {
        log('\n🎉 Your short URLs are now active!', 'green');
        log(`Base URL: https://${CONFIG.REPO_OWNER}.github.io/${CONFIG.REPO_NAME}/`, 'blue');
        log('Example: https://example.com/very-long-url -> https://your-domain.com/123', 'cyan');
    }
    
    log('='.repeat(60), 'bright');
}

// Main function
async function main() {
    log('🚀 URL Shortener CLI Tool', 'bright');
    log('أداة اختصار الروابط عبر سطر الأوامر\n', 'bright');
    
    // Check command line arguments
    const args = process.argv.slice(2);
    if (args.length === 0) {
        logError('Please provide XLSX file path');
        log('Usage: node url-shortener-cli.js <xlsx-file-path>', 'yellow');
        log('Example: node url-shortener-cli.js urls-to-shorten.xlsx', 'yellow');
        process.exit(1);
    }
    
    const xlsxFilePath = args[0];
    
    // Pre-flight checks
    logInfo('Running pre-flight checks...');
    
    if (!checkGitHubCLI()) {
        logError('GitHub CLI (gh) is not installed');
        log('Please install it from: https://cli.github.com/', 'yellow');
        process.exit(1);
    }
    
    if (!checkGitHubAuth()) {
        logError('You are not authenticated with GitHub CLI');
        log('Please run: gh auth login', 'yellow');
        process.exit(1);
    }
    
    logSuccess('All checks passed!');
    
    // Read URLs from XLSX
    const urls = readUrlsFromXLSX(xlsxFilePath);
    
    if (urls.length === 0) {
        logError('No valid URLs found in the XLSX file');
        process.exit(1);
    }
    
    if (urls.length > CONFIG.MAX_URLS) {
        logWarning(`File contains ${urls.length} URLs, but maximum is ${CONFIG.MAX_URLS}`);
        logWarning(`Only the first ${CONFIG.MAX_URLS} URLs will be processed`);
        urls.splice(CONFIG.MAX_URLS);
    }
    
    // Confirmation
    log(`\nAbout to create ${urls.length} GitHub issues for URL shortening.`, 'yellow');
    log('Each issue will become a short URL that redirects to the original.', 'yellow');
    log('\nPress Ctrl+C to cancel, or wait 5 seconds to continue...', 'bright');
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Process URLs
    logInfo('Starting URL processing...');
    const startTime = Date.now();
    
    const results = await processUrlsInChunks(urls);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);
    
    // Generate results file
    const resultsFile = generateResultsXLSX(results, xlsxFilePath);
    
    // Print summary
    printSummary(results);
    
    log(`\n⏱️  Total processing time: ${duration} seconds`, 'magenta');
    
    if (resultsFile) {
        log(`📁 Results file: ${resultsFile}`, 'blue');
    }
    
    log('\n🎯 Done! Your short URLs are ready to use.', 'green');
}

// Handle errors and cleanup
process.on('uncaughtException', (error) => {
    logError(`Uncaught exception: ${error.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logError(`Unhandled rejection at ${promise}: ${reason}`);
    process.exit(1);
});

process.on('SIGINT', () => {
    log('\n\n⚠️  Process interrupted by user. Exiting...', 'yellow');
    process.exit(0);
});

// Run the main function
if (require.main === module) {
    main().catch(error => {
        logError(`Fatal error: ${error.message}`);
        process.exit(1);
    });
}

module.exports = {
    CONFIG,
    readUrlsFromXLSX,
    createUrlIssue,
    processUrlsInChunks,
    generateResultsXLSX,
    isValidUrl
};