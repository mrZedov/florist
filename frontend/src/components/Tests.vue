<template>
  <div class="container" v-if="studiedCards.id">
    <header class="jumbotron">
      <div v-if="studiedCards.picture">
        <img :src="`/volume/${studiedCards.picture}`" />
      </div>
      <div v-if="studiedCards.id" class="centered">
        <!-- {{ studiedCards.id }} -->
        <b><span v-html="studiedCards.name"></span></b>
      </div>
      <button
        v-if="studiedCards.id"
        :class="['btn', 'btn-block', { 'btn-primary': haveAnswer() }]"
        v-on:click="onClickNextCard()"
      >
        следующий
      </button>
      <blog-post
        v-for="name in alternativeName"
        v-bind:key="name"
        v-bind:post="name"
      >
        <br />
        <button
          :class="[
            'btn',
            'btn-block',
            { 'btn-danger': isError(name) },
            { 'btn-success': isSuccess(name) },
          ]"
          v-on:click="onClickNameFlower(studiedCards.id, name)"
        >
          {{ name }}
        </button>
      </blog-post>
    </header>
  </div>
</template>

<script>
  import UserService from "../services/user.service";
  export default {
    name: "Tests",
    data() {
      return {
        content: "",
        studiedCards: "",
        alternativeName: "",
        answer: "",
        rightAnswer: "",
      };
    },
    mounted() {
      UserService.getExam().then(
        (response) => {
          this.studiedCards = response.data.studiedCards;
          this.alternativeName = response.data.alternativeName;
          (this.answer = ""), (this.rightAnswer = "");
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
      onClickNextCard() {
        UserService.getExam().then(
          (response) => {
            this.studiedCards = response.data.studiedCards;
            this.alternativeName = response.data.alternativeName;
            (this.answer = ""), (this.rightAnswer = "");
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
      haveAnswer() {
        return this.answer !== "";
      },
      isSuccess(n) {
        return n === this.rightAnswer;
      },
      isError(n) {
        if (n === this.rightAnswer) return false;
        return n === this.answer;
      },
      onClickNameFlower(id, n) {
        UserService.sendAnswerExam(id, n).then(
          (response) => {
            console.log(response.data);
            this.rightAnswer = response.data.rightAnswer;
            this.answer = response.data.answer;
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
    },
  };
</script>

<style scoped>
  img {
    width: 100%;
  }

  .centered {
    text-align: center;
  }
</style>
