const URLCOLLECTOR = () => {
    const url = new URL(window.location.href);
    const queryParams = {};
    url.searchParams.forEach((value, key) => {
        queryParams[key] = value;
    });
    const hash = url.hash ? url.hash.substring(1) : null;
    const pathSegments = url.pathname.split("/").filter((seg) => seg);
    const dataToStore = { query: Object.keys(queryParams).length ? queryParams : null, hash: hash || null, path: pathSegments.length ? pathSegments : null, origin: url.origin, fullUrl: url.href };
    Object.keys(dataToStore).forEach((key) => {
        if (dataToStore[key] === null) {
            delete dataToStore[key];
        }
    });
    sessionStorage.setItem("urlInfo", JSON.stringify(dataToStore));
};

const GETDATA=(Url,Name,callback)=>{

    const DATA={
        "spreadsheetUrl":Url,
        "sheetName":Name    
    };

    const APIS="https://script.google.com/macros/s/AKfycbyHFabMyQk2EoZXk8VV-L4dBKPAe6knmhyAm1W6sQ9_WRmq5clAozbfIznoCHY0l1ssSQ/exec";

    fetch(APIS,{
        method:"POST",
        mode:"cors",
        body:JSON.stringify(DATA)
    })

    .then(res => res.json())

    .then(data =>{

        callback(data);

    })
    .catch(Error => console.log(Error)
    )

};

const SESSIONDEJSONDATA = (MYDATA, callback) => {
    const DATA = sessionStorage.getItem(MYDATA);
    const MYDATATA = JSON.parse(DATA);
    callback(MYDATATA);
};

const JSONIFICATION = (DATA, callback) => {
    let DAA = JSON.stringify(DATA);
    callback(DAA);
};

const FINDER = (DATA, ELEMENT, ELEMENT1, ACTION) => {
    const user = DATA.find((item) => item[ELEMENT] === ELEMENT1);
    return ACTION(user ? user : false);
};

 const SITECLOSE = () => {
    if (localStorage.getItem("Environment") === "Production" || localStorage.getItem("OperatingSystem") === "Android") {
        Android.reloadApp();
    } else {
        window.close();
    }
};