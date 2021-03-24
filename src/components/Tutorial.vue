<template>
  <div>
    <div v-if="currentTutorial" class="edit-form">
      <h4>Tutorial</h4>
      <form class="ml-1">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="currentTutorial.title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            v-model="currentTutorial.description"
            name="description"
            id="description"
            cols="30"
            rows="4"
            required
            class="form-control"
          ></textarea>
        </div>

        <div class="form-group">
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>
      </form>

      <button
        class="badge badge-primary mr-2"
        v-if="currentTutorial.published"
        @click="updatePublished(false)"
      >
        UnPublish
      </button>

      <button
        v-else
        class="badge badge-primary mr-2"
        @click="updatePublished(true)"
      >
        Publish
      </button>

      <button class="badge badge-success mr-2" @click="updateTutorial">
        Update
      </button>

      <button class="badge badge-danger mr-2" @click="deleteTutorial">
        Delete
      </button>

      <p class="mt-3">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  props: ["tutorial"],
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  watch: {
    tutorial: function(tutorial) {
      this.currentTutorial = { ...tutorial };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      TutorialDataService.update(this.currentTutorial.key, {
        published: status,
      })
        .then(() => {
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      const data = {
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
      };

      TutorialDataService.update(this.currentTutorial.key, data)
        .then(() => {
          this.$emit("refreshList");
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.message = "";
    this.currentTutorial = { ...this.tutorial };
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
