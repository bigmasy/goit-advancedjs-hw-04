import{S as y,i as n,a as u}from"./assets/vendor-BMHzDZyJ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();let d=null;const h=document.querySelector(".gallery");function b(a){const t=a.map(({webformatURL:c,largeImageURL:o,tags:e,likes:r,views:s,comments:g,downloads:f})=>`<li class="gallery-item">
        <a class="gallery-link" href="${o}">
          <img
            class="gallery-image"
            src="${c}"
            data-source="${o}"
            alt="${e}"
          />
          <ul class='metadata'>
                <li>
                    <p class='metadata-heading'>Likes</p>
                    <p>${r}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Views</p>
                    <p>${s}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Comments</p>
                    <p>${g}</p>
                </li>
                <li>
                    <p metadata-heading>Downloads</p>
                    <p>${f}</p>
                </li>
            </ul>
        </a>
        
      </li>
      `).join("");h.insertAdjacentHTML("beforeend",t),d?d.refresh():d=new y(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})}const i={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".btn-load-more")},l={key:"50817296-2eab3913ceee07bc816ca0d08",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:1};function L(a){a.preventDefault(),l.page=1,i.gallery.innerHTML="";const t=a.target.elements.user_query.value.trim();if(t===""){n.warning({message:"Please enter a search query.",position:"topRight"});return}l.q=t,p(l)}async function p(a){i.loadMoreBtn.classList.remove("js-btn-load-more"),i.loader.classList.add("js-loader"),u.defaults.baseURL="https://pixabay.com";try{const{data:t}=await u.get("/api/",{params:a});if(t.total===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(t.hits),t.totalHits/a.page<a.per_page?n.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):i.loadMoreBtn.classList.add("js-btn-load-more")}catch(t){n.error({message:`An error occurred: ${t.message}`,position:"topRight"})}finally{i.loader.classList.remove("js-loader")}}async function q(){l.page+=1;let t=document.querySelector(".gallery-item").getBoundingClientRect();await p(l),window.scrollBy({top:t.height*2,behavior:"smooth"})}const m={form:document.querySelector(".form"),loadMore:document.querySelector(".btn-load-more")};m.form.addEventListener("submit",L);m.loadMore.addEventListener("click",q);
//# sourceMappingURL=index.js.map
