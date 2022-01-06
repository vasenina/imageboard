const comments = {
    data() {
        return {
            comments: [],
            error: true,
        };
    },
    props: ["imgId"],
    mounted() {
        console.log(
            "Comments mounted, we should get comments here",
            this.imgId
        );

        fetch("/get-comments?id=" + this.imgId)
            .then((resp) => resp.json())
            .then((data) => {
                this.comments = data;
                console.log(
                    "i got comments",
                    this.comments,
                    this.comments.length
                );
            });
    },
    methods: {
        addComment() {
            console.log("user added a comment");
            if (!this.username || !this.comment) {
                console.log("no data");
                return;
            }
            console.log("add comment", this.username, this.comment, this.imgId);
            const fd = new FormData();

            fd.append("username", this.username);
            console.log("fd", fd);
            fetch("/addcomment", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log("result: ", result);
                    if (result.success === false) {
                        //this.uploadError = true;
                    } else {
                        this.comments.unshift(result.comment);
                        //this.uploadFormVisible = false;
                    }

                    //this.fileUploaded = true;
                    //here
                })
                .catch((err) => {
                    console.log("error adding comment: ", err);
                    //this.uploadFormVisible = false;
                    //this.fileUploaded = false;
                });
        },
    },
    template: `<div>
    <p>comments here</p>
            <label for="iComment">Comment:</label>
            <input type="text" id="iComment" name="icomment" v-model="comment" maxlength="200">
            <label for="iUsername">Username:</label>
            <input type="text" id="iUsername" name="iUsername" v-model="username" maxlength="1100">
            <button @click="addComment">Submit</button>
            <div v-if= "comments.length" >
                 <div v-for='comment in comments' :key='comment.id'>
                    <p>{{comment.username}}</p>
                    <p>{{comment.comment_text}} created at {{comment.created_at}}</p>
                </div>
            </div>
            <div v-else>
                <p>No comments yet. Write first comment</p>
            </div>


    </div>`,
};
export default comments;

/* <div v-for='comment in comments' :key='comment.id'>
                    <p>{{comment.username}}</p>
                    <p>{{comment.comment_text}} created at {{comment.created_at}}</p>
                </div> */
