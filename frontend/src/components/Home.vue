<template>
  <div class="container">
    <header class="jumbotron">
      <div>
        <img :src="`/volume/${studiedCards.id}.${studiedCards.file_ext}`" />
      </div>
      <blog-post
        v-for="name in alternativeName"
        v-bind:key="name"
        v-bind:post="name"
      >
        <br />
        <button v-on:click="onClickNameFlower(name)">{{ name }}</button>
      </blog-post>
    </header>
  </div>
</template>

<script>
  import UserService from "../services/user.service";
  export default {
    name: "Home",
    data() {
      return {
        content: "",
        studiedCards: "",
        alternativeName: "",
      };
    },
    mounted() {
      UserService.getCard().then(
        (response) => {
          this.studiedCards = response.data.studiedCards;
          this.alternativeName = response.data.alternativeName;
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    methods: {
      onClickNameFlower: function (n) {
        console.log(n);
        UserService.sendAnswer(n);
      },
    },
  };
</script>
