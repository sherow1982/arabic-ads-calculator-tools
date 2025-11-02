/* include quick-fab */
(function(){
  try{
    fetch('partials/quick-fab.html').then(r=>r.text()).then(html=>{
      const wrapper=document.createElement('div');
      wrapper.innerHTML=html;document.body.appendChild(wrapper);
    });
  }catch(e){console.warn('FAB load failed',e)}
})();
