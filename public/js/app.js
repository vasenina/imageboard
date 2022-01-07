import * as Vue from "./vue.js";
import imageView from "./imageview.js";

Vue.createApp({
    data() {
        return {
            uploadFormVisible: true,
            uploadError: false,
            images: [],
            imageSelected: null,
            loadMore: "",
            dis: false,
            noDatawarning: false,
        };
    },
    components: {
        "image-view": imageView,
    },
    mounted() {
        fetch("/get-images")
            .then((resp) => resp.json())
            .then((data) => {
                this.images = data;
                if (
                    this.images.length &&
                    this.images[this.images.length - 1].lowestId >=
                        this.images[this.images.length - 1].id
                ) {
                    console.log("no more images");
                    this.loadMore = "btn-disabled";
                    this.dis = true;
                }
                console.log("IMAGE view  got images", this.images);
            });
    },
    methods: {
        showForm: function () {
            this.uploadFormVisible = true;
        },
        clearFields() {
            this.noDatawarning = false;
            this.title = null;
            this.description = null;
            this.username = null;
            this.country = null;
            this.file = null;
        },

        closeComponent() {
            console.log(
                "the component has emitted that it should be closed :D"
            );
            this.imageSelected = null;
            // document.body.classList.remove("modal-open");
        },
        selectImage(clickedId) {
            console.log("user cliked on an img with id:", clickedId);
            this.imageSelected = clickedId;
            //document.body.classList.add("modal-open");
        },
        getMoreImages() {
            console.log("user wants more images");
            const lastId = this.images[this.images.length - 1].id;
            console.log("lastID", lastId);
            fetch("/get-images/" + lastId)
                .then((resp) => resp.json())
                .then((data) => {
                    this.images.push(...data);
                    if (
                        this.images.length &&
                        this.images[this.images.length - 1].lowestId >=
                            this.images[this.images.length - 1].id
                    ) {
                        console.log("no more images");
                        this.loadMore = "btn-disabled";
                        this.dis = true;
                    }
                    console.log("IMAGEbyId view got images", data);
                });
        },

        clickHandler: function () {
            //console.log("upload", this);
            // console.log("upload", this.file);
            if (
                !this.title ||
                !this.description ||
                !this.username ||
                !this.country ||
                !this.file
            ) {
                console.log("no data");
                this.noDatawarning = true;
                return;
            }
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            fd.append("country", this.country);
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
                        this.clearFields();
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
