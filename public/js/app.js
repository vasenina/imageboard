import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            name: "Onion",
            uploadFormVisible: true,
            uploadError: false,
            images: [],
        };
    },
    mounted() {
        fetch("/get-images")
            .then((resp) => resp.json())
            .then((data) => {
                this.images = data;
            });
    },
    methods: {
        showForm: function () {
            this.uploadFormVisible = true;
        },
        myCustomFunction: function (arg) {
            this.petClicked = arg;
        },
        makeDisappear: function () {
            this.petClicked = null;
            // Write code here that will make the button disappear when you click on it!
        },
        clickHandler: function () {
            console.log("upload", this);
            console.log("upload", this.file);
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log("result: ", result);
                    if (result.success === false) {
                        this.uploadError = true;
                    } else {
                        this.images.unshift(result.image);
                        this.uploadFormVisible = false;
                    }

                    //this.fileUploaded = true;
                    //here
                })
                .catch((err) => {
                    console.log("error uploading new image: ", err);
                    this.uploadFormVisible = false;
                    //this.fileUploaded = false;
                });
        },
        fileSelectHandler: function (e) {
            console.log("fileselecthandler", e.target.files[0]);
            this.file = e.target.files[0];
        },
    },
}).mount("#main");
