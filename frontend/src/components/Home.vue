<template>
  <div class="container">
    <header class="jumbotron">
      123
      <img :src="`/${content.id}.jpg`" />
      {{ content }}
    </header>
  </div>
</template>

<script>
  import UserService from "../services/user.service";
  export default {
    name: "Home",
    data() {
      return {
        content: "1234",
      };
    },
    mounted() {
      UserService.getCard().then(
        (response) => {
          this.content = response.data.studiedCards;
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
  };
</script>
