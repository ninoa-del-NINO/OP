/* =====================================================
   派奖策略 Prototype V25
   reward-policy.js
   Part 1
===================================================== */

"use strict";

/* ===========================================
   全局状态
=========================================== */

const State = {

    currentStrategy: 0,

    strategies: [],

    venues: [],

    rules: []

};

/* ===========================================
   页面初始化
=========================================== */

document.addEventListener("DOMContentLoaded", init);

function init(){

    loadMockData();

    renderTabs();

    renderVenueTable();

    renderRuleTable();

    bindEvents();

}

/* ===========================================
   Mock Data
=========================================== */

function loadMockData(){

    if(typeof mockData === "undefined"){

        console.warn("mock-data.js 未加载");

        return;

    }

    State.strategies = mockData.strategies || [];

    State.venues = mockData.venues || [];

    State.rules = mockData.rules || [];

}

/* ===========================================
   Tabs
=========================================== */

function renderTabs(){

    const tabs = document.querySelector(".tabs");

    if(!tabs) return;

    tabs.innerHTML = "";

    State.strategies.forEach((item,index)=>{

        const button = document.createElement("button");

        button.className =

            index===State.currentStrategy

                ? "tab active"

                : "tab";

        button.innerText = item.name;

        button.onclick = ()=>{

            changeStrategy(index);

        };

        tabs.appendChild(button);

    });

}

function changeStrategy(index){

    State.currentStrategy = index;

    renderTabs();

    renderVenueTable();

    renderRuleTable();

}

/* ===========================================
   数据源
=========================================== */

function renderVenueTable(){

    const container =

        document.getElementById("venueContainer");

    if(!container) return;

    container.innerHTML="";

    State.venues.forEach(item=>{

        const row=document.createElement("div");

        row.className="venue-row";

        row.innerHTML=`

            <span class="venue-name">

                ${item.name}

            </span>

            <span class="venue-tags">

                ${renderTags(item.tags)}

            </span>

        `;

        container.appendChild(row);

    });

}

/* ===========================================
   Tag
=========================================== */

function renderTags(list){

    if(!list) return "";

    let html="";

    list.forEach(tag=>{

        html+=`

        <span class="tag">

            ${tag}

        </span>

        `;

    });

    return html;

}

/* ===========================================
   Rule Table
=========================================== */

function renderRuleTable(){

    const tbody=

        document.querySelector(

            "#ruleTable tbody"

        );

    if(!tbody) return;

    tbody.innerHTML="";

    State.rules.forEach(rule=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

        <td>${rule.bet}</td>

        <td>${rule.loss}</td>

        <td>${rule.reward}</td>

        <td>${rule.rollover}</td>

        <td>

            <span class="delete">

                删除

            </span>

        </td>

        `;

        tbody.appendChild(tr);

    });

}

/* ===========================================
   Toast
=========================================== */

function showToast(message){

    const toast=

        document.getElementById(

            "toastContainer"

        );

    if(!toast) return;

    toast.innerHTML=`

        <div class="toast">

            ${message}

        </div>

    `;

    const box=

        toast.querySelector(".toast");

    box.style.display="block";

    setTimeout(()=>{

        box.style.display="none";

    },2000);

}/* ===========================================
   公共事件
=========================================== */

function bindEvents(){

    const save=

        document.getElementById(

            "btnSave"

        );

    if(save){

        save.onclick=()=>{

            savePage();

        };

    }
}

/* ===========================================
   保存
=========================================== */

function savePage(){

    console.log(State);

    showToast("保存成功");

}
/* =====================================================
   派奖策略 Prototype V25
   reward-policy.js
   Part 2
   Modal + Confirm + 策略管理
=====================================================*/

/* ===========================================
   Modal 管理
=========================================== */

const Modal = {

    container: null,

    init() {
        this.container = document.getElementById("modalContainer");
    },

    open(html) {

        if (!this.container) this.init();

        this.container.innerHTML = `
            <div class="modal show">
                <div class="modal-content">
                    ${html}
                </div>
            </div>
        `;

        this.container.querySelector(".modal").style.display = "flex";
    },

    close() {

        if (!this.container) return;

        this.container.innerHTML = "";

    }

};

/* ===========================================
   Confirm
=========================================== */

function showConfirm(title, content, callback) {

    Modal.open(`

        <div class="modal-header">

            ${title}

        </div>

        <div class="modal-body">

            <div style="padding:10px 0">

                ${content}

            </div>

        </div>

        <div class="modal-footer">

            <button id="btnCancel">

                取消

            </button>

            <button id="btnOK">

                确定

            </button>

        </div>

    `);

    document.getElementById("btnCancel").onclick = () => {

        Modal.close();

    };

    document.getElementById("btnOK").onclick = () => {

        Modal.close();

        if (callback) callback();

    };

}

/* ===========================================
   新增策略
=========================================== */

function openAddStrategyModal() {

    Modal.open(`

        <div class="modal-header">

            新增策略

        </div>

        <div class="modal-body">

            <div>

                策略名称

            </div>

            <input
                id="strategyName"
                style="width:100%;margin-top:6px">

        </div>

        <div class="modal-footer">

            <button id="btnCancel">

                取消

            </button>

            <button id="btnSubmit">

                确定

            </button>

        </div>

    `);

    document.getElementById("btnCancel").onclick = () => {

        Modal.close();

    };

    document.getElementById("btnSubmit").onclick = () => {

        const name =
            document
                .getElementById("strategyName")
                .value
                .trim();

        if (name === "") {

            showToast("请输入策略名称");

            return;

        }

        State.strategies.push({

            id: Date.now(),

            name: name

        });

        Modal.close();

        renderTabs();

        showToast("新增成功");

    };

}

/* ===========================================
   编辑策略
=========================================== */

function openEditStrategyModal() {

    const item =
        State.strategies[
            State.currentStrategy
        ];

    if (!item) return;

    Modal.open(`

        <div class="modal-header">

            编辑策略

        </div>

        <div class="modal-body">

            <div>

                策略名称

            </div>

            <input
                id="strategyName"
                value="${item.name}"
                style="width:100%;margin-top:6px">

        </div>

        <div class="modal-footer">

            <button id="btnCancel">

                取消

            </button>

            <button id="btnSubmit">

                保存

            </button>

        </div>

    `);

    document.getElementById("btnCancel").onclick = () => {

        Modal.close();

    };

    document.getElementById("btnSubmit").onclick = () => {

        item.name =
            document
                .getElementById("strategyName")
                .value
                .trim();

        Modal.close();

        renderTabs();
      showToast("修改成功");

    };

}

/* ===========================================
   删除策略
=========================================== */

function deleteCurrentStrategy() {

    if (State.strategies.length <= 1) {

        showToast("至少保留一个策略");

        return;

    }

    showConfirm(

        "删除策略",

        "确认删除当前策略？",

        () => {

            State.strategies.splice(

                State.currentStrategy,

                1

            );

            State.currentStrategy = 0;

            renderTabs();

            showToast("删除成功");

        }

    );

}

/* ===========================================
   策略按钮事件
=========================================== */

function bindStrategyEvents() {

    const add =
        document.getElementById(
            "btnAddStrategy"
        );

    const edit =
        document.getElementById(
            "btnEditStrategy"
        );

    const del =
        document.getElementById(
            "btnDeleteStrategy"
        );

    if (add)
        add.onclick = openAddStrategyModal;

    if (edit)
        edit.onclick = openEditStrategyModal;

    if (del)
        del.onclick = deleteCurrentStrategy;

}

/* ===========================================
   初始化追加
=========================================== */

const oldInit = init;

init = function () {

    oldInit();

    bindStrategyEvents();

};
/* =====================================================
   reward-policy.js
   Part 3A
   体育场馆管理
=====================================================*/

/* ===========================================
   当前操作场馆
=========================================== */

let currentVenue = null;

/* ===========================================
   体育场馆下拉数据
=========================================== */

const VenueOptions = [

    "沙巴体育",

    "PM体育",

    "BTI体育",

    "CMD体育",

    "IM体育"

];

/* ===========================================
   添加体育场馆
=========================================== */

function openAddVenueModal(){

    let options="";

    VenueOptions.forEach(item=>{

        if(!State.venues.find(v=>v.name===item)){

            options+=`<option value="${item}">${item}</option>`;

        }

    });

    Modal.open(`

        <div class="modal-header">

            添加体育场馆

        </div>

        <div class="modal-body">

            <div>

                体育场馆

            </div>

            <select
                id="venueSelect"
                style="width:100%;margin-top:8px">

                ${options}

            </select>

        </div>

        <div class="modal-footer">

            <button id="btnCancel">

                取消

            </button>

            <button id="btnSubmit">

                确定

            </button>

        </div>

    `);

    document.getElementById("btnCancel").onclick=()=>{

        Modal.close();

    };

    document.getElementById("btnSubmit").onclick=()=>{

        const value=

            document.getElementById("venueSelect").value;

        if(value===""){

            showToast("请选择体育场馆");

            return;

        }

        State.venues.push({

            name:value,

            tags:[]

        });

        Modal.close();

        renderVenueTable();

        showToast("添加成功");

    };

}

/* ===========================================
   删除体育场馆
=========================================== */

function deleteVenue(name){

    showConfirm(

        "删除体育场馆",

        "确认删除【"+name+"】？",

        ()=>{

            State.venues=

                State.venues.filter(

                    item=>item.name!==name

                );

            renderVenueTable();

            showToast("删除成功");

        }

    );

}

/* ===========================================
   重绘体育场馆
=========================================== */

function renderVenueTable(){

    const container=

        document.getElementById(

            "venueContainer"

        );

    if(!container) return;

    container.innerHTML="";

    State.venues.forEach(item=>{

        const row=document.createElement("div");

        row.className="venue-row";

        row.innerHTML=`

            <div class="venue-left">

                ${item.name}

            </div>

            <div class="venue-right">

                ${renderTags(item.tags)}

                <button

                    class="btn-small"

                    data-name="${item.name}"

                    data-action="add">

                    添加

                </button>

                <span

                    class="delete"

                    data-name="${item.name}"

                    data-action="delete">

                    删除

                </span>

            </div>

        `;

        container.appendChild(row);

    });

    bindVenueEvents();

}

/* ===========================================
   体育场馆事件
=========================================== */

function bindVenueEvents(){

    document

        .querySelectorAll(

            '[data-action="delete"]'

        )

        .forEach(btn=>{

            btn.onclick=()=>{

                deleteVenue(

                    btn.dataset.name

                );

            };

        });

    document

        .querySelectorAll(

            '[data-action="add"]'

        )

        .forEach(btn=>{

            btn.onclick=()=>{

                currentVenue=

                    btn.dataset.name;

                openLeagueModal();

            };
          });

}

/* ===========================================
   添加体育场馆按钮
=========================================== */

function bindVenueButton(){

    const btn=

        document.getElementById(

            "btnAddVenue"

        );

    if(btn){

        btn.onclick=

            openAddVenueModal;

    }

}

/* ===========================================
   初始化追加
=========================================== */

const oldInit2=init;

init=function(){

    oldInit2();

    bindVenueButton();

};
/* =====================================================
   reward-policy.js
   Part 3B
   联赛ID管理
=====================================================*/

/* ===========================================
   当前编辑场馆
=========================================== */

let currentVenueName = "";

/* ===========================================
   打开联赛ID弹窗
=========================================== */

function openLeagueModal(venueName){

    currentVenueName = venueName;

    Modal.open(`

        <div class="modal-header">

            添加联赛ID

        </div>

        <div class="modal-body">

            <div>联赛ID</div>

            <input
                id="leagueInput"
                type="text"
                style="width:100%;margin-top:8px;">

            <div
                style="margin-top:8px;color:#999;">

                最多添加10个联赛ID

            </div>

        </div>

        <div class="modal-footer">

            <button id="btnCancel">

                取消

            </button>

            <button id="btnSubmit">

                确定

            </button>

        </div>

    `);

    document.getElementById("btnCancel").onclick = Modal.close;

    document.getElementById("btnSubmit").onclick = addLeagueId;

}

/* ===========================================
   添加联赛ID
=========================================== */

function addLeagueId(){

    const input = document
        .getElementById("leagueInput");

    const value = input.value.trim();

    if(value===""){

        showToast("请输入联赛ID");

        return;

    }

    if(!/^[0-9]+$/.test(value)){

        showToast("联赛ID只能输入数字");

        return;

    }

    const venue = State.venues.find(

        item=>item.name===currentVenueName

    );

    if(!venue){

        Modal.close();

        return;

    }

    if(venue.tags.length>=10){

        showToast("最多添加10个联赛ID");

        return;

    }

    if(venue.tags.includes(value)){

        showToast("联赛ID已存在");

        return;

    }

    venue.tags.push(value);

    Modal.close();

    renderVenueTable();

    showToast("添加成功");

}

/* ===========================================
   删除联赛ID
=========================================== */

function deleteLeagueId(

    venueName,

    leagueId

){

    const venue = State.venues.find(

        item=>item.name===venueName

    );

    if(!venue) return;

    showConfirm(

        "删除联赛ID",

        "确认删除联赛ID："+leagueId+"？",

        ()=>{

            venue.tags = venue.tags.filter(

                item=>item!==leagueId

            );

            renderVenueTable();

            showToast("删除成功");

        }

    );

}

/* ===========================================
   重绘Tag
=========================================== */

function renderTags(list,venueName){

    if(!list) return "";

    let html="";

    list.forEach(item=>{

        html+=`

        <span class="tag">

            ${item}

            <span

                class="delete"

                data-league="${item}"

                data-venue="${venueName}"

                style="margin-left:4px;">

                ×

            </span>

        </span>

        `;

    });

    return html;

}

/* ===========================================
   重绘体育场馆
=========================================== */

const oldRenderVenueTable = renderVenueTable;

renderVenueTable = function(){

    const container =

        document.getElementById(

            "venueContainer"

        );

    container.innerHTML="";

    State.venues.forEach(item=>{

        const row=document.createElement("div");

        row.className="venue-row";

        row.innerHTML=`

            <div class="venue-left">

                ${item.name}

            </div>

            <div class="venue-right">

                ${renderTags(item.tags,item.name)}

                <button
                    class="btn-small"

                    onclick="openLeagueModal('${item.name}')">

                    添加

                </button>

                <span

                    class="delete"
                    onclick="deleteVenue('${item.name}')">

                    删除

                </span>

            </div>

        `;

        container.appendChild(row);

    });

    bindLeagueEvents();

};

/* ===========================================
   Tag事件
=========================================== */

function bindLeagueEvents(){

    document

        .querySelectorAll(

            "[data-league]"

        )

        .forEach(item=>{

            item.onclick=()=>{

                deleteLeagueId(

                    item.dataset.venue,

                    item.dataset.league

                );

            };

        });

}
function addRule(){

    State.rules.push({

        bet:"",

        loss:"",

        reward:"",

        rollover:""

    });

    renderRuleTable();

}

function removeRule(index){

    showConfirm(

        "删除规则",

        "确认删除该规则？",

        ()=>{

            State.rules.splice(index,1);

            renderRuleTable();

            showToast("删除成功");

        }

    );

}

/* ===========================================
   重绘规则
=========================================== */

renderRuleTable=function(){

    const tbody=document.querySelector("#ruleTable tbody");

    if(!tbody) return;

    tbody.innerHTML="";

    State.rules.forEach((item,index)=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`

            <td>

                <input

                    value="${item.bet}"

                    data-index="${index}"

                    data-key="bet"

                    class="rule-input">

            </td>

            <td>

                <input

                    value="${item.loss}"

                    data-index="${index}"

                    data-key="loss"

                    class="rule-input">

            </td>

            <td>

                <input

                    value="${item.reward}"

                    data-index="${index}"

                    data-key="reward"

                    class="rule-input">

            </td>

            <td>

                <input

                    value="${item.rollover}"

                    data-index="${index}"

                    data-key="rollover"

                    class="rule-input">

            </td>

            <td>

                <span

                    class="delete"

                    data-rule="${index}">

                    删除

                </span>

            </td>

        `;

        tbody.appendChild(tr);

    });

    bindRuleEvents();

}

/* ===========================================
   Rule Event
=========================================== */

function bindRuleEvents(){

    document

        .querySelectorAll(".rule-input")

        .forEach(input=>{

            input.oninput=()=>{

                const index=input.dataset.index;

                const key=input.dataset.key;

                State.rules[index][key]=

                    input.value;

            };

        });

    document

        .querySelectorAll("[data-rule]")

        .forEach(item=>{

            item.onclick=()=>{

                removeRule(

                    item.dataset.rule

                );

            };

        });

}

/* ===========================================
   新增规则
=========================================== */

function bindRuleButton(){

    const btn=

        document.getElementById(

            "btnAddRule"

        );

    if(btn){

        btn.onclick=addRule;

    }

}

/* ===========================================
   活动存款条件
=========================================== */

function bindDeposit(){

    const radios=

        document.querySelectorAll(

            'input[name="deposit"]'

        );

    const input=

        document.getElementById(

            "depositAmount"

        );

    radios.forEach(r=>{

        r.onchange=()=>{

            input.disabled=

                radios[1].checked;

        };

    });

}

/* ===========================================
   保存
=========================================== */

savePage=function(){

    const data={

        strategy:

            State.strategies,

        venue:

            State.venues,

        rules:

            State.rules,

        deposit:

            document.getElementById(

                "depositAmount"

            ).value

    };

    console.log(data);

    showToast(

        "保存成功"

    );

}
/* ===========================================
   页面初始化追加
=========================================== */

const oldInit3=init;

init=function(){

    oldInit3();

    bindRuleButton();

    bindDeposit();

}
