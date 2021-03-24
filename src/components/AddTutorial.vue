<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          v-model="tutorial.description"
          name="description"
          id="description"
          cols="30"
          rows="5"
          required
          class="form-control"
        ></textarea>
        <button
          @click="saveTutorial"
          class="mt-4 px-4 py-2 btn btn-success float-right"
        >
          Submit
        </button>
      </div>
    </div>

    <div v-else>
      <h4>You submitted succesfully!</h4>
      <router-link to="/tutorials">
        <button class="mt-4 btn btn-success" @click="newTutorial">
          See All Tutorials
        </button>
      </router-link>
      <button class="mt-4 ml-2 btn btn-secondary" @click="newTutorial">
        Add New Tutorial
      </button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      let data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        published: false,
      };

      TutorialDataService.create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {
        title: "",
        description: "",
        published: false,
      };
    },
  },
};
</script>

<style scoped>
*,
*:hover,
*:active,
*:focus {
  outline: none;
}

textarea {
  resize: none;
}
</style>
