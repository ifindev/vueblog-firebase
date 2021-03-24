<template>
  <div class="mt-5">
    <div class="list row">
      <div class="col-md-6">
        <h4>Tutorials List</h4>
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(tutorial, index) in tutorials"
            :key="index"
            @click="setActiveTutorial(tutorial, index)"
          >
            {{ tutorial.title }}
          </li>
        </ul>

        <button
          v-if="undefined !== tutorials && tutorials.length > 0"
          class="mt-3 py-2 btn btn-sm btn-danger btn-block"
          @click="removeAllTutorials"
        >
          Remove All
        </button>
      </div>
      <div class="col-md-6 pt-small">
        <div v-if="currentTutorial">
          <tutorial-details
            :tutorial="currentTutorial"
            @refreshList="refreshList"
          />
        </div>
        <div v-else>
          <br />
          <p class="mt-3 p-3 text-white bg-primary rounded">
            <strong>Please click on a Tutorial ...</strong>
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="tutorials === undefined && tutorials.length === 0"
      class="container bg-dark p-4 mt-2 mx-3"
    >
      <h5 class="text-white">
        Oops... There are no tutorials in here
      </h5>
      <router-link to="/add"
        ><button class="mt-2 btn btn-success">
          Add New Tutorial
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
import TutorialDetails from "./Tutorial";

export default {
  name: "tutorials-list",
  components: {
    TutorialDetails,
  },
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };
  },
  methods: {
    onDataChange(items) {
      let _tutorials = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _tutorials.push({
          key: key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });

      this.tutorials = _tutorials;
    },

    refreshList() {
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    TutorialDataService.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    TutorialDataService.getAll().off("value", this.onDataChange);
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

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

li:hover,
li:active {
  cursor: pointer;
}

@media (max-width: 768px) {
  .list {
    max-width: 420px;
  }

  .pt-small {
    margin-top: 3rem;
  }
}
</style>
