<template>
  <b-overlay
    :show="isLoading"
    rounded="sm"
    class="mt-2"
  >
    <TagForm
      :show="show"
      :showForm="showForm"
      :submitted="submitted"
      :submit="submit"
    />
    <TagTable
      :lista="tagList"
      :rows="tagListSize"
      :showForm="showForm"
      :show="show"
    />

  </b-overlay>
</template>

<script>
import TagTable from '@/components/tag/TagTable';
import TagForm from '@/components/tag/TagForm';
import { mapGetters, createNamespacedHelpers } from 'vuex';
import store from '@/store';
import { TAG_CREATE, TAG_UPDATE, FETCH_TAGS } from '@/store/actions.type';
import { BASE_RESET } from '@/store/mutations.types';
const { mapGetters: mapGettersBase } = createNamespacedHelpers('BaseModule');

export default {
  name: 'TagPage',
  components: { TagTable, TagForm },
  data() {
    return {
      showForm: false,
      submitted: false,
    };
  },
  methods: {
    show() {
      try {
        this.showForm = !this.showForm;
        if (this.showForm) {
          store.commit(BASE_RESET, null, { root: true });
        }
        this.$nextTick(() => {
          this.$children[0].$children[0].$refs.title.focus();
        });
      } catch (error) {
        console.log(error);
      }
    },
    submit() {
      this.submitted = true;
      this.$children[0].$children[0].$validator.validate().then((isValid) => {
        if (isValid) {
          const metodo = this.tag.id ? TAG_UPDATE : TAG_CREATE;
          store.dispatch(metodo, this.tag).then(
            () => {
              this.showForm = false;
              this.submitted = false;
            },
            (error) => {
              this.showForm = true;
            }
          );
        }
      });
    },
  },
  computed: {
    ...mapGettersBase(['isLoading']),
    ...mapGetters(['tag', 'tagList', 'tagListSize']),
  },
  created() {
    store.dispatch(FETCH_TAGS);
    // this.$store.dispatch('tag/fetchAll')
  },
};
</script>