const checkSVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const folderSVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>';
  const smartSVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>';
  const tagSVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></svg>';
  const $=id=>document.getElementById(id);

  const API = window.notesAPI || {
    _m:null, load:async()=>API._m, save:async(d)=>{API._m=d;return true;},
    encrypt:async(t)=>"demo:"+btoa(unescape(encodeURIComponent(t))),
    decrypt:async(b)=>{try{return{ok:true,text:decodeURIComponent(escape(atob(b.replace("demo:",""))))}}catch(e){return{ok:false}}},
    exportPdf:async()=>{window.print();return{ok:true};},
    openNoteWindow:()=>{},
    onStoreChanged:()=>{}
  };

  const DICT={
    ru:{folders:"Папки",allNotes:"Все заметки",recentlyDeleted:"Недавно удалённые",search:"Поиск",
      sortUpdated:"По дате изменения",sortCreated:"По дате создания",sortTitle:"По названию",
      pinned:"Закреплённые",notes:"Заметки",noNotes:"Здесь пока нет заметок",trashEmpty:"Корзина пуста",
      newNoteTitle:"Новая заметка",noText:"Нет дополнительного текста",yesterday:"Вчера",noteLockedMeta:"Заметка заблокирована",
      titlePh:"Заголовок",bodyPh:"Начните печатать…",edited:"Изменено: ",
      lockedHeading:"Эта заметка заблокирована",enterPass:"Введите пароль",openBtn:"Открыть",wrongPass:"Неверный пароль",
      restore:"Восстановить",deleteForever:"Удалить навсегда",selectNote:"Выберите заметку или создайте новую",
      styleText:"Текст",styleTitle:"Заголовок",styleHeading:"Подзаголовок",styleMono:"Моноширинный",styleQuote:"Цитата",
      newFolder:"Новая папка",newNote:"Новая заметка",bold:"Жирный",italic:"Курсив",underline:"Подчёркнутый",strike:"Зачёркнутый",
      highlight:"Выделить цветом",bulleted:"Маркированный список",numbered:"Нумерованный список",checklist:"Чек-лист",
      table:"Таблица",image:"Картинка",move:"Переместить в папку",lock:"Заблокировать паролем",unlock:"Снять блокировку",
      pin:"Закрепить",unpin:"Открепить",trash:"В корзину",theme:"Светлая / тёмная тема",
      ok:"OK",cancel:"Отмена",create:"Создать",
      newFolderTitle:"Новая папка",folderNamePh:"Название папки",
      movePickTitle:"Переместить в папку",noFolders:"Сначала создайте папку",
      setPassTitle:"Защита паролем",setPassMsg:"Запомните пароль — без него заметку не открыть.",passPh:"Пароль",lockOk:"Заблокировать",
      removeLockTitle:"Снять блокировку?",removeLockMsg:"Заметка снова станет доступна без пароля.",removeOk:"Снять",
      deleteForeverTitle:"Удалить навсегда?",deleteForeverMsg:"Это действие нельзя отменить.",deleteOk:"Удалить",
      welcomeTitle:"Добро пожаловать 👋",welcomeBody:"Это ваши заметки. Они сохраняются на этом компьютере автоматически.<br><br>Создайте новую заметку кнопкой-карандашом справа сверху.",
      rename:"Переименовать",renameFolderTitle:"Переименовать папку",deleteFolderMenu:"Удалить папку",deleteFolderTitle:"Удалить папку?",deleteFolderMsg:"Заметки из неё попадут в «Недавно удалённые».",ctxDelete:"Удалить",
      duplicate:"Дублировать",exportPdf:"Экспорт в PDF",lockNow:"Заблокировать сейчас",removePass:"Снять пароль",folderLockedTitle:"В папке есть защищённые заметки",folderLockedMsg:"Сначала снимите с них пароль или переместите их в другую папку.",tags:"Теги",newSmartFolder:"Создать умную папку",openWindow:"Открыть в новом окне",
      defPersonal:"Личное",defWork:"Работа"},
    en:{folders:"Folders",allNotes:"All Notes",recentlyDeleted:"Recently Deleted",search:"Search",
      sortUpdated:"Date Edited",sortCreated:"Date Created",sortTitle:"Title",
      pinned:"Pinned",notes:"Notes",noNotes:"No notes yet",trashEmpty:"Trash is empty",
      newNoteTitle:"New Note",noText:"No additional text",yesterday:"Yesterday",noteLockedMeta:"Note is locked",
      titlePh:"Title",bodyPh:"Start typing…",edited:"Edited: ",
      lockedHeading:"This note is locked",enterPass:"Enter password",openBtn:"Open",wrongPass:"Wrong password",
      restore:"Restore",deleteForever:"Delete Forever",selectNote:"Select a note or create a new one",
      styleText:"Body",styleTitle:"Title",styleHeading:"Heading",styleMono:"Monospaced",styleQuote:"Quote",
      newFolder:"New folder",newNote:"New note",bold:"Bold",italic:"Italic",underline:"Underline",strike:"Strikethrough",
      highlight:"Highlight",bulleted:"Bulleted list",numbered:"Numbered list",checklist:"Checklist",
      table:"Table",image:"Image",move:"Move to folder",lock:"Lock with password",unlock:"Remove lock",
      pin:"Pin",unpin:"Unpin",trash:"Move to Trash",theme:"Light / dark theme",
      ok:"OK",cancel:"Cancel",create:"Create",
      newFolderTitle:"New Folder",folderNamePh:"Folder name",
      movePickTitle:"Move to Folder",noFolders:"Create a folder first",
      setPassTitle:"Password Protection",setPassMsg:"Remember the password — the note can't be opened without it.",passPh:"Password",lockOk:"Lock",
      removeLockTitle:"Remove Lock?",removeLockMsg:"The note will be accessible without a password again.",removeOk:"Remove",
      deleteForeverTitle:"Delete Forever?",deleteForeverMsg:"This action cannot be undone.",deleteOk:"Delete",
      welcomeTitle:"Welcome 👋",welcomeBody:"These are your notes. They are saved on this computer automatically.<br><br>Create a new note using the pencil button at the top right.",
      rename:"Rename",renameFolderTitle:"Rename Folder",deleteFolderMenu:"Delete Folder",deleteFolderTitle:"Delete Folder?",deleteFolderMsg:"Its notes will be moved to Recently Deleted.",ctxDelete:"Delete",
      duplicate:"Duplicate",exportPdf:"Export to PDF",lockNow:"Lock Now",removePass:"Remove Password",folderLockedTitle:"This folder has protected notes",folderLockedMsg:"Remove their password or move them to another folder first.",tags:"Tags",newSmartFolder:"New Smart Folder",openWindow:"Open in New Window",
      defPersonal:"Personal",defWork:"Work"}
  };
  let lang="ru";
  const t=k=>DICT[lang][k]||k;
  const locale=()=>lang==="ru"?"ru-RU":"en-US";

  // ---- Кастомные диалоги (Promise-based) ----
  function mkBack(){const b=document.createElement("div");b.className="modal-backdrop";document.body.appendChild(b);requestAnimationFrame(()=>b.classList.add("show"));return b;}
  function closeBack(b,cb){b.classList.remove("show");setTimeout(()=>{b.remove();cb&&cb();},160);}

  function dlgInput({title,message,placeholder,value="",password=false,ok}){return new Promise(res=>{
    const back=mkBack(),m=document.createElement("div");m.className="modal";
    m.innerHTML=`<h3></h3>${message?'<div class="msg"></div>':""}<input><div class="modal-actions"><button class="m-btn cancel"></button><button class="m-btn ok"></button></div>`;
    back.appendChild(m);
    m.querySelector("h3").textContent=title; if(message)m.querySelector(".msg").textContent=message;
    const inp=m.querySelector("input");inp.type=password?"password":"text";inp.placeholder=placeholder||"";inp.value=value;
    m.querySelector(".cancel").textContent=t("cancel");
    const okb=m.querySelector(".ok");okb.textContent=ok||t("ok");
    setTimeout(()=>inp.focus(),70);
    const done=v=>closeBack(back,()=>res(v));
    m.querySelector(".cancel").onclick=()=>done(null);
    okb.onclick=()=>done(inp.value);
    inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();done(inp.value);}if(e.key==="Escape")done(null);});
    back.addEventListener("mousedown",e=>{if(e.target===back)done(null);});
  });}

  function dlgConfirm({title,message,ok,danger}){return new Promise(res=>{
    const back=mkBack(),m=document.createElement("div");m.className="modal";
    m.innerHTML=`<h3></h3>${message?'<div class="msg"></div>':""}<div class="modal-actions"><button class="m-btn cancel"></button><button class="m-btn ${danger?"danger":"ok"}"></button></div>`;
    back.appendChild(m);
    m.querySelector("h3").textContent=title; if(message)m.querySelector(".msg").textContent=message;
    m.querySelector(".cancel").textContent=t("cancel");
    const okb=m.querySelector(".m-btn:last-child");okb.textContent=ok||t("ok");
    const done=v=>closeBack(back,()=>res(v));
    m.querySelector(".cancel").onclick=()=>done(false);okb.onclick=()=>done(true);
    back.addEventListener("mousedown",e=>{if(e.target===back)done(false);});
    const esc=e=>{if(e.key==="Escape"){document.removeEventListener("keydown",esc);done(false);}};document.addEventListener("keydown",esc);
  });}

  function dlgPick({title,options}){return new Promise(res=>{
    const back=mkBack(),m=document.createElement("div");m.className="modal";
    m.innerHTML=`<h3></h3><div class="modal-list"></div><div class="modal-actions"><button class="m-btn cancel"></button></div>`;
    back.appendChild(m);m.querySelector("h3").textContent=title;
    const list=m.querySelector(".modal-list");
    const done=v=>closeBack(back,()=>res(v));
    if(!options.length){const e=document.createElement("div");e.className="opt empty";e.textContent=t("noFolders");list.appendChild(e);}
    options.forEach(o=>{const d=document.createElement("div");d.className="opt";d.innerHTML=folderSVG+'<span></span>';d.querySelector("span").textContent=o.label;d.onclick=()=>done(o.id);list.appendChild(d);});
    m.querySelector(".cancel").textContent=t("cancel");
    m.querySelector(".cancel").onclick=()=>done(null);
    back.addEventListener("mousedown",e=>{if(e.target===back)done(null);});
  });}

  function applyI18n(){
    document.documentElement.setAttribute("lang",lang);
    document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=t(el.dataset.i18n));
    document.querySelectorAll("[data-i18n-title]").forEach(el=>el.title=t(el.dataset.i18nTitle));
    document.querySelectorAll("[data-i18n-ph]").forEach(el=>el.placeholder=t(el.dataset.i18nPh));
    $("editBody").setAttribute("data-placeholder",t("bodyPh"));
    $("langBtn").textContent=lang.toUpperCase();
    const so=$("sortSelect").options;so[0].text=t("sortUpdated");so[1].text=t("sortCreated");so[2].text=t("sortTitle");
    const fo=$("fmtSelect").options;fo[0].text=t("styleText");fo[1].text=t("styleTitle");fo[2].text=t("styleHeading");fo[3].text=t("styleMono");fo[4].text=t("styleQuote");
    refreshTitle();
    const n=notes.find(x=>x.id===activeId); if(n){updatePin(n);updateLock(n);}
  }
  function refreshTitle(){
    let txt;
    if(activeFolder==="trash")txt=t("recentlyDeleted");
    else if(activeFolder.startsWith("tag:"))txt="#"+activeFolder.slice(4);
    else txt=folderName(activeFolder);
    $("folderTitle").textContent=txt;
  }
  // --- Теги (#тег) ---
  function extractTags(n){
    let h=n.locked?bodyHtml(n):(n.html||"");
    h=h.replace(/<br\s*\/?>/gi," ").replace(/<\/(div|p|li|h[1-6]|tr|ul|ol|blockquote)>/gi," ").replace(/<(div|p|li|h[1-6]|tr)\b[^>]*>/gi," ");
    const d=document.createElement("div");d.innerHTML=h;
    const text=(n.title||"")+" "+(d.textContent||"");
    const out=new Map();
    const re=/(^|[^\p{L}\p{N}_#])#([\p{L}][\p{L}\p{N}_\-]*)/gu;
    let m;
    while((m=re.exec(text))){const tag=m[2];const k=tag.toLowerCase();if(!out.has(k))out.set(k,tag);}
    return [...out.values()];
  }
  function noteHasTag(n,tag){const k=tag.toLowerCase();return extractTags(n).some(x=>x.toLowerCase()===k);}
  function allTags(){
    const counts=new Map();
    notes.filter(n=>!n.deleted).forEach(n=>extractTags(n).forEach(tag=>{const k=tag.toLowerCase();const e=counts.get(k)||{tag,count:0};e.count++;counts.set(k,e);}));
    return [...counts.values()].sort((a,b)=>a.tag.localeCompare(b.tag,locale()));
  }

  let folders=[], notes=[], theme="light";
  let activeId=null, activeFolder="all", query="", sortBy="updated";
  const sessionPass=new Map(), sessionText=new Map();

  function defaultFolders(){return [{id:"all",system:true},{id:"f1",name:t("defPersonal")},{id:"f2",name:t("defWork")}];}
  function folderName(id){const f=folders.find(x=>x.id===id);if(!f)return"";return f.system?t("allNotes"):f.name;}

  async function boot(){
    const saved=await API.load();
    if(saved&&saved.notes){
      folders=saved.folders||[]; notes=saved.notes; theme=saved.theme||"light"; lang=saved.lang||"ru";
      if(!folders.some(f=>f.id==="all")) folders.unshift({id:"all",system:true});
    } else {
      lang=(navigator.language||"ru").toLowerCase().startsWith("en")?"en":"ru";
      folders=defaultFolders();
      notes=[{id:Date.now(),folder:"f1",title:t("welcomeTitle"),html:t("welcomeBody"),pinned:true,locked:false,enc:null,created:Date.now(),updated:Date.now(),deleted:false}];
      theme="light";
    }
    document.documentElement.setAttribute("data-theme",theme);
    applyI18n(); renderFolders(); renderList();
    // открытие одной заметки в отдельном окне (?focus=id)
    const focusId=new URLSearchParams(location.search).get("focus");
    if(focusId){document.querySelector(".app").classList.add("single");const fid=Number(focusId);if(notes.some(n=>n.id===fid))selectNote(fid);}
    // подхватываем изменения из других окон
    if(API.onStoreChanged)API.onStoreChanged(reloadFromDisk);
  }
  async function reloadFromDisk(){
    const saved=await API.load();if(!saved||!saved.notes)return;
    const editing=document.activeElement===$("editBody")||document.activeElement===$("editTitle");
    folders=saved.folders||folders;
    if(editing&&activeId!=null){
      const mine=notes.find(n=>n.id===activeId);
      notes=saved.notes.map(n=>n.id===activeId&&mine?mine:n);
      if(mine&&!saved.notes.some(n=>n.id===activeId))notes.push(mine);
    } else {
      notes=saved.notes;
    }
    renderFolders();renderList();
    if(!editing&&activeId!=null){const n=notes.find(x=>x.id===activeId);if(n&&!n.deleted&&!(n.locked&&!sessionPass.has(n.id))){$("editTitle").value=n.title;$("editBody").innerHTML=bodyHtml(n);}}
  }

  let saveTimer=null;
  function persist(){clearTimeout(saveTimer);saveTimer=setTimeout(()=>API.save({folders,notes,theme,lang}),250);}

  function renderFolders(){
    const trashCount=notes.filter(n=>n.deleted).length;
    let html=folders.map(f=>{
      let count;
      if(f.id==="all")count=notes.filter(n=>!n.deleted).length;
      else if(f.smart)count=notes.filter(n=>!n.deleted&&noteHasTag(n,f.tag)).length;
      else count=notes.filter(n=>n.folder===f.id&&!n.deleted).length;
      const icon=f.id==="all"?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>':(f.smart?smartSVG:folderSVG);
      return `<div class="folder ${f.id===activeFolder?"active":""}" data-id="${f.id}">${icon}<span class="f-name">${esc(folderName(f.id))}</span><span class="f-count">${count||""}</span></div>`;
    }).join("");
    html+='<div class="rail-sep"></div>';
    html+=`<div class="folder ${activeFolder==="trash"?"active":""}" data-id="trash"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg><span class="f-name">${t("recentlyDeleted")}</span><span class="f-count">${trashCount||""}</span></div>`;
    const tags=allTags();
    if(tags.length){
      html+='<div class="rail-label">'+t("tags")+'</div>';
      html+=tags.map(({tag,count})=>`<div class="folder tag-row ${activeFolder==="tag:"+tag.toLowerCase()?"active":""}" data-tag="${esc(tag)}">${tagSVG}<span class="f-name">#${esc(tag)}</span><span class="f-count">${count||""}</span></div>`).join("");
    }
    $("folderList").innerHTML=html;
    $("folderList").querySelectorAll(".folder").forEach(d=>{
      if(d.dataset.tag!==undefined){
        d.onclick=()=>{activeFolder="tag:"+d.dataset.tag.toLowerCase();activeId=null;closeAll();renderFolders();renderList();refreshTitle();};
        d.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();tagContextMenu(d.dataset.tag,e.clientX,e.clientY);};
        return;
      }
      d.onclick=()=>{activeFolder=d.dataset.id;activeId=null;closeAll();renderFolders();renderList();refreshTitle();};
      const f=folders.find(x=>x.id===d.dataset.id);
      if(d.dataset.id!=="trash"&&f&&!f.system){d.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();folderContextMenu(f,e.clientX,e.clientY);};}
    });
  }
  function tagContextMenu(tag,x,y){
    showCtx(x,y,[
      {label:t("newSmartFolder"),action:()=>{if(!folders.some(f=>f.smart&&f.tag.toLowerCase()===tag.toLowerCase())){folders.push({id:"s"+Date.now(),name:tag,smart:true,tag});renderFolders();persist();}}}
    ]);
  }

  function renderList(){
    const q=query.toLowerCase();
    let items;
    if(activeFolder==="trash")items=notes.filter(n=>n.deleted);
    else if(activeFolder.startsWith("tag:")){const tg=activeFolder.slice(4);items=notes.filter(n=>!n.deleted&&noteHasTag(n,tg));}
    else{const sf=folders.find(f=>f.id===activeFolder&&f.smart);
      if(sf)items=notes.filter(n=>!n.deleted&&noteHasTag(n,sf.tag));
      else items=notes.filter(n=>!n.deleted&&(activeFolder==="all"||n.folder===activeFolder));}
    items=items.filter(n=>n.title.toLowerCase().includes(q)||(!n.locked&&strip(n.html).toLowerCase().includes(q)));
    items.sort((a,b)=>{
      if(activeFolder!=="trash"&&a.pinned!==b.pinned)return b.pinned-a.pinned;
      if(sortBy==="title")return a.title.localeCompare(b.title,locale());
      if(sortBy==="created")return b.created-a.created;
      return b.updated-a.updated;
    });
    if(!items.length){$("noteList").innerHTML='<div class="empty-list">'+(activeFolder==="trash"?t("trashEmpty"):t("noNotes"))+'</div>';return;}
    const cell=n=>`<div class="note-cell ${n.id===activeId?"active":""}" data-id="${n.id}">
      ${n.pinned&&!n.deleted?'<svg class="pin" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3l5 5-4 1-4 4-1 5-2-2-4 4-1-1 4-4-2-2 5-1 4-4z"/></svg>':""}
      <div class="nc-title">${n.locked?'<svg class="lock-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>':""}<span>${esc(n.title)||t("newNoteTitle")}</span></div>
      <div class="nc-meta"><span class="nc-date">${fmtDate(n.updated)}</span>&nbsp;&nbsp;${n.locked?t("noteLockedMeta"):esc(snip(n.html))}</div></div>`;
    let html="";
    if(activeFolder!=="trash"){
      const pin=items.filter(n=>n.pinned),oth=items.filter(n=>!n.pinned);
      if(pin.length)html+='<div class="section-label">'+t("pinned")+'</div>'+pin.map(cell).join("")+'<div class="section-label">'+t("notes")+'</div>';
      html+=oth.map(cell).join("");
    } else html=items.map(cell).join("");
    $("noteList").innerHTML=html;
    $("noteList").querySelectorAll(".note-cell").forEach(el=>{el.onclick=()=>selectNote(Number(el.dataset.id));el.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();noteContextMenu(Number(el.dataset.id),e.clientX,e.clientY);};});
  }

  function esc(s){return (s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
  function strip(h){const d=document.createElement("div");d.innerHTML=h||"";return d.textContent||""}
  function snip(h){const x=strip(h).replace(/\s+/g," ").trim();return x||t("noText")}
  function fmtDate(ts){const d=new Date(ts),n=new Date();if(d.toDateString()===n.toDateString())return d.toLocaleTimeString(locale(),{hour:"2-digit",minute:"2-digit"});const y=new Date(n);y.setDate(n.getDate()-1);if(d.toDateString()===y.toDateString())return t("yesterday");return d.toLocaleDateString(locale(),{day:"2-digit",month:"2-digit",year:"2-digit"})}

  function closeAll(){$("page").style.display="none";$("toolbar").style.display="none";$("trashBar").classList.remove("show");$("lockScreen").classList.remove("show");$("noSelection").style.display="grid";}
  function showEditor(){$("noSelection").style.display="none";$("lockScreen").classList.remove("show");$("trashBar").classList.remove("show");$("page").style.display="block";$("toolbar").style.display="flex";}
  function bodyHtml(n){return n.locked?(sessionText.get(n.id)||""):n.html;}

  function selectNote(id){
    activeId=id;const n=notes.find(x=>x.id===id);if(!n)return;renderList();
    if(n.deleted){$("noSelection").style.display="none";$("page").style.display="block";$("toolbar").style.display="none";$("lockScreen").classList.remove("show");$("trashBar").classList.add("show");$("editTitle").value=n.title;$("editBody").innerHTML=n.html;$("editDate").textContent="";$("editBody").setAttribute("contenteditable","false");$("editTitle").readOnly=true;return;}
    if(n.locked&&!sessionPass.has(n.id)){$("noSelection").style.display="none";$("page").style.display="none";$("toolbar").style.display="none";$("trashBar").classList.remove("show");$("lockScreen").classList.add("show");$("unlockInput").value="";$("unlockInput").placeholder=t("enterPass");setTimeout(()=>$("unlockInput").focus(),50);return;}
    showEditor();$("editBody").setAttribute("contenteditable","true");$("editTitle").readOnly=false;
    $("editTitle").value=n.title;$("editBody").innerHTML=bodyHtml(n);
    $("editDate").textContent=t("edited")+new Date(n.updated).toLocaleString(locale(),{day:"2-digit",month:"long",hour:"2-digit",minute:"2-digit"});
    updatePin(n);updateLock(n);
  }
  function updatePin(n){$("pinBtn").style.color=n.pinned?"var(--accent-strong)":"var(--text-2)";$("pinBtn").title=n.pinned?t("unpin"):t("pin");}
  function updateLock(n){$("lockBtn").style.color=n.locked?"var(--accent-strong)":"var(--text-2)";$("lockBtn").title=n.locked?t("lockNow"):t("lock");}

  function newNote(folderId){
    const folder=folderId||((activeFolder==="all"||activeFolder==="trash")?(folders.find(f=>!f.system)?.id||"all"):activeFolder);
    const n={id:Date.now(),folder,title:"",html:"",pinned:false,locked:false,enc:null,created:Date.now(),updated:Date.now(),deleted:false};
    notes.unshift(n);if(activeFolder==="trash")activeFolder="all";selectNote(n.id);$("editTitle").focus();renderFolders();persist();
  }
  async function saveActive(){
    const n=notes.find(x=>x.id===activeId);if(!n||n.deleted)return;
    n.title=$("editTitle").value;n.updated=Date.now();const html=$("editBody").innerHTML;
    if(n.locked){sessionText.set(n.id,html);const p=sessionPass.get(n.id);if(p){n.enc=await API.encrypt(html,p);n.html="";}}
    else n.html=html;
    renderList();renderFolders();persist();
  }

  $("langBtn").onclick=()=>{lang=lang==="ru"?"en":"ru";applyI18n();renderFolders();renderList();persist();};
  $("newBtn").onclick=newNote;
  $("newFolderBtn").onclick=async()=>{const name=await dlgInput({title:t("newFolderTitle"),placeholder:t("folderNamePh"),ok:t("create")});if(name&&name.trim()){folders.push({id:"f"+Date.now(),name:name.trim()});renderFolders();persist();}};
  $("searchInput").oninput=e=>{query=e.target.value;renderList();};
  $("sortSelect").onchange=e=>{sortBy=e.target.value;renderList();};

  $("editTitle").addEventListener("input",saveActive);
  $("editBody").addEventListener("input",saveActive);
  $("fmtSelect").onchange=e=>{document.execCommand("formatBlock",false,e.target.value);$("editBody").focus();saveActive();};
  document.querySelectorAll(".tool[data-cmd]").forEach(b=>b.onclick=()=>{document.execCommand(b.dataset.cmd,false,null);$("editBody").focus();refreshState();saveActive();});
  $("hlBtn").onclick=()=>{const sel=window.getSelection();if(!sel.rangeCount||sel.isCollapsed){$("editBody").focus();return;}const r=sel.getRangeAt(0);const m=document.createElement("mark");try{m.appendChild(r.extractContents());r.insertNode(m);}catch(e){}$("editBody").focus();saveActive();};
  function refreshState(){document.querySelectorAll(".tool[data-cmd]").forEach(b=>{try{b.classList.toggle("active",document.queryCommandState(b.dataset.cmd))}catch(e){}});}
  document.addEventListener("selectionchange",refreshState);

  $("checkBtn").onclick=()=>{
    const sel=window.getSelection();
    let node=sel.anchorNode; if(node&&node.nodeType===3)node=node.parentElement;
    const item=node?node.closest(".check-item"):null;
    if(item){
      // уже в чек-листе → выключаем: текст пункта переносим в обычную строку
      const ul=item.closest(".checklist");
      const html=item.querySelector(".check-text").innerHTML;
      const d=document.createElement("div");
      d.innerHTML=(html&&html.replace(/[\u200b\s]/g,""))?html:"<br>";
      ul.parentNode.insertBefore(d,ul.nextSibling);
      item.remove();
      if(!ul.querySelector(".check-item"))ul.remove();
      caret(d);
    } else {
      document.execCommand("insertHTML",false,'<ul class="checklist"><li class="check-item"><span class="check-box">'+checkSVG+'</span><span class="check-text" contenteditable="true">&#8203;</span></li></ul>');
      const texts=$("editBody").querySelectorAll(".check-text");
      if(texts.length)caret(texts[texts.length-1]);
    }
    $("editBody").focus();saveActive();
  };
  $("editBody").addEventListener("click",e=>{const box=e.target.closest(".check-box");if(box){box.closest(".check-item").classList.toggle("done");saveActive();}});
  $("editBody").addEventListener("keydown",e=>{
    if(e.key==="Enter"){const sel=window.getSelection();const item=sel.anchorNode&&sel.anchorNode.parentElement?sel.anchorNode.parentElement.closest(".check-item"):null;
      if(item){e.preventDefault();const txt=item.querySelector(".check-text");
        if(txt.textContent.replace(/\u200b/g,"").trim()===""){const ul=item.closest(".checklist");const d=document.createElement("div");d.innerHTML="<br>";ul.after(d);item.remove();caret(d);}
        else{const li=document.createElement("li");li.className="check-item";li.innerHTML='<span class="check-box">'+checkSVG+'</span><span class="check-text" contenteditable="true">&#8203;</span>';item.after(li);caret(li.querySelector(".check-text"));}
        saveActive();}}});
  function caret(node){const r=document.createRange(),s=window.getSelection();r.selectNodeContents(node);r.collapse(false);s.removeAllRanges();s.addRange(r);}

  $("tableBtn").onclick=()=>{let html='<table>';for(let i=0;i<2;i++){html+='<tr>';for(let j=0;j<2;j++)html+='<td>&#8203;</td>';html+='</tr>';}html+='</table><div><br></div>';document.execCommand("insertHTML",false,html);$("editBody").focus();saveActive();};
  $("imgBtn").onclick=()=>$("imgInput").click();
  $("imgInput").onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{document.execCommand("insertHTML",false,'<img src="'+rd.result+'"><div><br></div>');saveActive();};rd.readAsDataURL(f);e.target.value="";};

  $("moveBtn").onclick=async()=>{const n=notes.find(x=>x.id===activeId);if(!n)return;const opts=folders.filter(f=>!f.system).map(f=>({id:f.id,label:f.name}));const id=await dlgPick({title:t("movePickTitle"),options:opts});if(id){n.folder=id;renderFolders();renderList();persist();}};

  $("lockBtn").onclick=async()=>{const n=notes.find(x=>x.id===activeId);if(!n)return;
    if(!n.locked){
      const p=await dlgInput({title:t("setPassTitle"),message:t("setPassMsg"),placeholder:t("passPh"),password:true,ok:t("lockOk")});
      if(p){const html=$("editBody").innerHTML;n.enc=await API.encrypt(html,p);n.html="";n.locked=true;sessionPass.delete(n.id);sessionText.delete(n.id);renderList();persist();selectNote(n.id);}
    } else {
      // защищена и сейчас открыта → закрыть (спрятать), пароль снова потребуется
      sessionPass.delete(n.id);sessionText.delete(n.id);renderList();selectNote(n.id);
    }};
  // снять защиту совсем (вызывается из контекстного меню, когда заметка открыта)
  async function removePassword(n){
    if(!sessionPass.has(n.id)){selectNote(n.id);return;}
    if(await dlgConfirm({title:t("removeLockTitle"),message:t("removeLockMsg"),ok:t("removeOk")})){
      n.html=sessionText.get(n.id)||"";n.enc=null;n.locked=false;sessionPass.delete(n.id);sessionText.delete(n.id);updateLock(n);renderList();persist();selectNote(n.id);
    }
  }
  $("unlockBtn").onclick=async()=>{const n=notes.find(x=>x.id===activeId);if(!n)return;const res=await API.decrypt(n.enc,$("unlockInput").value);if(res.ok){sessionPass.set(n.id,$("unlockInput").value);sessionText.set(n.id,res.text);selectNote(n.id);}else{$("unlockInput").value="";$("unlockInput").placeholder=t("wrongPass");}};
  $("unlockInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("unlockBtn").click();});

  $("pinBtn").onclick=()=>{const n=notes.find(x=>x.id===activeId);if(!n)return;n.pinned=!n.pinned;updatePin(n);renderList();persist();};
  function trashNote(n){
    if(n.locked && !sessionPass.has(n.id)){ selectNote(n.id); return; } // защищена → сначала пароль
    n.deleted=true;n.deletedAt=Date.now();activeId=null;closeAll();renderFolders();renderList();persist();
  }
  $("delBtn").onclick=()=>{const n=notes.find(x=>x.id===activeId);if(!n)return;trashNote(n);};
  $("restoreBtn").onclick=()=>{const n=notes.find(x=>x.id===activeId);if(!n)return;n.deleted=false;activeId=null;closeAll();renderFolders();renderList();persist();};
  $("purgeBtn").onclick=async()=>{if(await dlgConfirm({title:t("deleteForeverTitle"),message:t("deleteForeverMsg"),ok:t("deleteOk"),danger:true})){notes=notes.filter(x=>x.id!==activeId);activeId=null;closeAll();renderFolders();renderList();persist();}};
  $("themeBtn").onclick=()=>{theme=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",theme);persist();};

  boot();
  // ---- Фикс скролла колёсиком в редакторе ----
  // contenteditable перехватывает wheel — пробрасываем его в родительский скролл-контейнер
  $("editBody").addEventListener("wheel", function(e) {
    const scroll = this.closest(".editor-scroll");
    if (!scroll) return;
    // Проверяем, нужен ли скролл (тело не переполнено само по себе)
    const atTop    = scroll.scrollTop === 0 && e.deltaY < 0;
    const atBottom = scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 1 && e.deltaY > 0;
    if (!atTop && !atBottom) {
      // Есть куда скроллить — просто скроллим контейнер
      e.preventDefault();
      scroll.scrollBy({ top: e.deltaY * 1.2, behavior: "auto" });
    }
  }, { passive: false });

  $("editTitle").addEventListener("wheel", function(e) {
    const scroll = this.closest(".editor-scroll");
    if (scroll) { e.preventDefault(); scroll.scrollBy({ top: e.deltaY * 1.2, behavior: "auto" }); }
  }, { passive: false });

  // ---- Контекстное меню (правый клик) ----
  let ctxEl=null;
  function closeCtx(){ if(ctxEl){ctxEl.remove();ctxEl=null;} }
  document.addEventListener("click",closeCtx);
  document.addEventListener("contextmenu",e=>{ if(ctxEl && !ctxEl.contains(e.target)) closeCtx(); });
  window.addEventListener("blur",closeCtx);
  function showCtx(x,y,items){
    closeCtx();
    const m=document.createElement("div");m.className="ctx-menu";
    items.forEach(it=>{
      if(it.sep){const s=document.createElement("div");s.className="sep";m.appendChild(s);return;}
      const d=document.createElement("div");d.className="ci"+(it.danger?" danger":"");d.textContent=it.label;
      d.onclick=ev=>{ev.stopPropagation();closeCtx();it.action();};
      m.appendChild(d);
    });
    document.body.appendChild(m);
    const r=m.getBoundingClientRect();
    if(x+r.width>window.innerWidth-8)x=window.innerWidth-r.width-8;
    if(y+r.height>window.innerHeight-8)y=window.innerHeight-r.height-8;
    m.style.left=Math.max(8,x)+"px";m.style.top=Math.max(8,y)+"px";
    ctxEl=m;
  }

  function noteContextMenu(id,x,y){
    const n=notes.find(z=>z.id===id); if(!n)return;
    selectNote(id);
    let items;
    if(n.deleted){
      items=[
        {label:t("restore"),action:()=>{n.deleted=false;activeId=null;closeAll();renderFolders();renderList();persist();}},
        {label:t("deleteForever"),danger:true,action:async()=>{if(await dlgConfirm({title:t("deleteForeverTitle"),message:t("deleteForeverMsg"),ok:t("deleteOk"),danger:true})){notes=notes.filter(z=>z.id!==n.id);activeId=null;closeAll();renderFolders();renderList();persist();}}}
      ];
    } else {
      items=[
        {label:n.pinned?t("unpin"):t("pin"),action:()=>{n.pinned=!n.pinned;updatePin(n);renderList();persist();}},
        {label:n.locked?t("removePass"):t("lock"),action:()=>{ if(n.locked)removePassword(n); else $("lockBtn").click(); }},
        {label:t("duplicate"),action:()=>{const c=JSON.parse(JSON.stringify(n));c.id=Date.now();c.pinned=false;c.created=Date.now();c.updated=Date.now();c.deleted=false;notes.unshift(c);renderFolders();renderList();persist();}},
        {label:t("move"),action:async()=>{const opts=folders.filter(f=>!f.system).map(f=>({id:f.id,label:f.name}));const fid=await dlgPick({title:t("movePickTitle"),options:opts});if(fid){n.folder=fid;renderFolders();renderList();persist();}}},
        {label:t("exportPdf"),action:async()=>{let html=n.locked?(sessionText.get(n.id)||""):n.html;if(n.locked&&!sessionText.has(n.id)){selectNote(n.id);return;}await API.exportPdf({title:n.title||t("newNoteTitle"),html});}},
        {label:t("openWindow"),action:()=>API.openNoteWindow(n.id)},
        {sep:true},
        {label:t("ctxDelete"),danger:true,action:()=>trashNote(n)}
      ];
    }
    showCtx(x,y,items);
  }

  function folderContextMenu(f,x,y){
    if(f.smart){
      showCtx(x,y,[
        {label:t("rename"),action:async()=>{const name=await dlgInput({title:t("renameFolderTitle"),placeholder:t("folderNamePh"),value:f.name,ok:t("ok")});if(name&&name.trim()){f.name=name.trim();renderFolders();refreshTitle();persist();}}},
        {sep:true},
        {label:t("deleteFolderMenu"),danger:true,action:()=>{folders=folders.filter(x=>x.id!==f.id);if(activeFolder===f.id){activeFolder="all";activeId=null;closeAll();}renderFolders();renderList();refreshTitle();persist();}}
      ]);
      return;
    }
    showCtx(x,y,[
      {label:t("newNote"),action:()=>{activeFolder=f.id;refreshTitle();renderFolders();newNote(f.id);}},
      {label:t("newFolder"),action:async()=>{const name=await dlgInput({title:t("newFolderTitle"),placeholder:t("folderNamePh"),ok:t("create")});if(name&&name.trim()){folders.push({id:"f"+Date.now(),name:name.trim()});renderFolders();persist();}}},
      {label:t("rename"),action:async()=>{const name=await dlgInput({title:t("renameFolderTitle"),placeholder:t("folderNamePh"),value:f.name,ok:t("ok")});if(name&&name.trim()){f.name=name.trim();renderFolders();renderList();refreshTitle();persist();}}},
      {sep:true},
      {label:t("deleteFolderMenu"),danger:true,action:async()=>{if(notes.some(n=>n.folder===f.id&&!n.deleted&&n.locked)){await dlgConfirm({title:t("folderLockedTitle"),message:t("folderLockedMsg"),ok:t("ok")});return;}if(await dlgConfirm({title:t("deleteFolderTitle"),message:t("deleteFolderMsg"),ok:t("deleteOk"),danger:true})){notes.forEach(n=>{if(n.folder===f.id&&!n.deleted){n.deleted=true;n.deletedAt=Date.now();}});folders=folders.filter(x=>x.id!==f.id);if(activeFolder===f.id){activeFolder="all";activeId=null;closeAll();}renderFolders();renderList();refreshTitle();persist();}}}
    ]);
  }

  // ---- Клавиша Del — удалить выбранную заметку (если не печатаем) ----
  document.addEventListener("keydown",e=>{
    if(e.key!=="Delete")return;
    if(ctxEl||document.querySelector(".modal-backdrop"))return;
    const ae=document.activeElement;
    if(ae&&(ae.isContentEditable||ae.tagName==="INPUT"||ae.tagName==="TEXTAREA"))return;
    if(activeId==null)return;
    const n=notes.find(x=>x.id===activeId); if(!n)return;
    if(n.deleted)$("purgeBtn").click(); else trashNote(n);
  });
