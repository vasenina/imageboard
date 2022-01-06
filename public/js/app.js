import * as Vue from "./vue.js";
import imageView from "./imageview.js";

Vue.createApp({
    data() {
        return {
            uploadFormVisible: true,
            uploadError: false,
            images: [],
            imageSelected: null,
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
                console.log("IMAGE view  got images", this.images);
            });
    },
    methods: {
        showForm: function () {
            this.uploadFormVisible = true;
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
        clickHandler: function () {
            console.log("upload", this);
            console.log("upload", this.file);
            if (
                !this.title ||
                !this.description ||
                !this.username ||
                !this.country ||
                !this.file
            ) {
                console.log("no data");
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
