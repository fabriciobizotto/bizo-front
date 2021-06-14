<template>
  <b-overlay
    :show="isLoading"
    rounded="sm"
    class="mt-2"
  >
    <CategoryForm
      :show="show"
      :showForm="showForm"
      :submitted="submitted"
      :submit="submit"
      :categories="categoryList"
    />
    <CategoryTable
      :lista="categoryList"
      :rows="categoryListSize"
      :showForm="showForm"
      :show="show"
    />

  </b-overlay>
</template>

<script>
import CategoryTable from '@/components/category/CategoryTable';
import CategoryForm from '@/components/category/CategoryForm';
import { mapGetters, createNamespacedHelpers } from 'vuex';
import store from '@/store';
import {
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  FETCH_CATEGORIES,
} from '@/store/actions.type';
import { BASE_RESET } from '@/store/mutations.types';
const { mapGetters: mapGettersBase } = createNamespacedHelpers('BaseModule');

export default {
  name: 'CategoryPage',
  components: { CategoryTable, CategoryForm },
  data() {
    return {
      showForm: false,
      submitted: false,
    };
  },
  methods: {
    show(aberto = false) {
      try {
        this.showForm = aberto || !this.showForm;
        if (this.showForm) {
          store.commit(BASE_RESET, null, { root: true });
        }
        this.$nextTick(() => {
          // console.log(this.$children[0].$children[0].$refs.title);
          this.$children[0].$children[0].$refs.category_id.focus();
        });
      } catch (error) {
        console.log(error);
      }
    },
    submit() {
      this.submitted = true;
      this.$children[0].$children[0].$validator.validate().then((isValid) => {
        if (isValid) {
          const metodo = this.category.id ? CATEGORY_UPDATE : CATEGORY_CREATE;
          store.dispatch(metodo, this.category).then(
            () => {
              this.showForm = false;
              this.submitted = false;
            },
            (error) => {
              this.showForm = true;
            }
          );
        } else {
          const first_error =
            this.$children[0].$children[0].$validator.errors.items[0].field;
          const refs = this.$children[0].$children[0].$refs;
          refs[first_error].focus();
        }
      });
    },
  },
  computed: {
    ...mapGettersBase(['isLoading']),
    ...mapGetters(['category', 'categoryList', 'categoryListSize']),
  },
  created() {
    store.dispatch(FETCH_CATEGORIES);
  },
};
</script>