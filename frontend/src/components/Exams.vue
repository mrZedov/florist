<template>
  <div class="container" v-if="studiedCards.id">
    <header class="jumbotron">
      <div v-if="studiedCards.picture">
        <img :src="`/volume/pic-exam/${studiedCards.picture}`" />
      </div>
      <div v-if="studiedCards.id" class="studiedCards, text-left">
        <b><span v-html="studiedCards.name"></span></b>
      </div>
      <br />
      <button
        v-if="studiedCards.id"
        :class="[
          'btn',
          'btn-block',
          { 'btn-outline-primary': !haveAnswer() },
          { 'btn-primary': haveAnswer() },
        ]"
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
            'text-left',
            'btn',
            'btn-block',
            { 'btn-outline-dark': !isError(name) && !isSuccess(name) },
            { 'btn-light': !isError(name) && !isSuccess(name) },
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
  <div class="container">
    <div class="row">
      <div class="column">
        ответов
        <font size="5" color="008000"
          ><b> {{totalSuccess.success}}</b></font
        >
        /
        <font size="5" color="FF0000"
          ><b> {{totalSuccess.fail}} </b></font
        >
      </div>
    </div>
  </div>
</template>

<script>
  import UserService from "../services/user.service";
  export default {
    name: "Exams",
    data() {
      return {
        content: "",
        studiedCards: "",
        alternativeName: "",
        answer: "",
        rightAnswer: "",
        totalSuccess:'',
      };
    },
    mounted() {
      UserService.getExam().then(
        (response) => {
          this.studiedCards = response.data.studiedCards;
          this.alternativeName = response.data.alternativeName;
          this.totalSuccess = response.data.totalSuccess;
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
            this.totalSuccess = response.data.totalSuccess;
            this.alternativeName = response.data.alternativeName;
            this.totalSuccess = response.data.totalSuccess;
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
        if (!this.answer)
          UserService.sendAnswerExam(id, n).then(
            (response) => {
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
  .studiedCards {
    padding: 50px;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }
  body {
    font-family: "Montserrat", sans-serif;
  }
  .container {
    max-width: 1200px;
    margin: auto;
    border: 0px dotted #999;
  }
  .row {
    display: grid;
    grid-template-columns: repeat(3, 33%);
  }
  .column {
    max-width: 100%;
    min-height: 1px;
    border: 0px dotted #939;
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>
