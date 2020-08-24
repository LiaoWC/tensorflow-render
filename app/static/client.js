var el = x => document.getElementById(x);

function showPicker() {
    el("file-input").click();
}

function showPicked(input) {
    el("upload-label").innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function (e) {
        el("image-picked").src = e.target.result;
        el("image-picked").className = "";
    };
    reader.readAsDataURL(input.files[0]);
}

function analyze() {
    var uploadFiles = el("file-input").files;
    if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

    el("analyze-button").innerHTML = "Analyzing...";
    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
        true);
    xhr.onerror = function () {
        alert(xhr.responseText);
    };
    xhr.onload = function (e) {
        if (this.readyState === 4) {
            var response = JSON.parse(e.target.responseText);
            let res = response["result"]
            let resName
            console.log(typeof res)
            switch (res) {
                case '0':
                    resName = "白頭翁"
                    break
                case '1':
                    resName = "喜鵲"
                    break
                case '2':
                    resName = "麻雀"
                    break
                case '3':
                    resName = "鴿子"
                    break
                case '4':
                    resName = "大笨鳥"
                    break
            }
            el("result-label").innerHTML = resName;
            console.log(resName)
        }
        el("analyze-button").innerHTML = "Analyze";
    };

    var fileData = new FormData();
    fileData.append("file", uploadFiles[0]);
    xhr.send(fileData);
}

