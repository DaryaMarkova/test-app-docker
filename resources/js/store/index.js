import { commentDataService } from "./../data/api";

export const Types = {
    LOAD: "loadComments",
    ADD: "createComment",
    DELETE: "deleteComment",
    SET_RANGE: "setDataRange",
    SET_PREDICATE: "setSortPredicate",
    SET_FILTER: "setFilter"
};

export const Store = {
    state() {
        return {
            allComments: [],
            sortPredicate: () => 1, // предикат сортировки
            filterPredicate: it => it, // предикат фильтрации
            startSliceIndex: 0, // индексы начала
            endSliceIndex: 0, // и конца массива для отображения среза данных,
            isLoading: false,
            isError: false,
            errorMessage: ""
        };
    },
    getters: {
        displayedComments(state) {
            const {
                sortPredicate,
                filterPredicate,
                startSliceIndex,
                endSliceIndex
            } = state;

            return state.allComments
                .sort(sortPredicate)
                .filter(filterPredicate)
                .slice(
                    startSliceIndex,
                    endSliceIndex > 0 ? endSliceIndex : state.allComments.length
                );
        }
    },
    actions: {
        async [Types.LOAD]({ commit, state }) {
            state.isLoading = true;
            state.isError = false;

            commentDataService
                .fetchComments()
                .then(list => commit(Types.LOAD, list))
                .catch(() => {
                    commit(Types.LOAD, []);
                    state.isError = true;
                    state.errorMessage = "Error loading data";
                })
                .finally(() => {
                    state.isLoading = false;
                });
        },
        [Types.ADD]({ commit, state }, comment) {
            state.isLoading = true;
            state.isError = false;

            commentDataService
                .createComment(comment)
                .then(createdComment => commit(Types.ADD, createdComment))
                .catch(() => {
                    state.isError = true;
                    state.errorMessage = "Error adding data";
                })
                .finally(() => {
                    state.isLoading = false;
                });
        },
        [Types.DELETE]({ commit, state }, commentId) {
            state.isLoading = true;
            state.isError = false;

            commentDataService
                .deleteComment(commentId)
                .then(() => commit(Types.DELETE, commentId))
                .catch(() => {
                    state.isError = true;
                    state.errorMessage = "Error deleting data";
                })
                .finally(() => {
                    state.isLoading = false;
                });
        },
        [Types.SET_RANGE]({ commit }, range) {
            commit(Types.SET_RANGE, range);
        },
        [Types.SET_PREDICATE]({ commit }, predicate) {
            commit(Types.SET_PREDICATE, predicate);
        },
        [Types.SET_FILTER]({ commit }, filter) {
            commit(Types.SET_FILTER, filter);
        }
    },
    mutations: {
        async [Types.LOAD](state, comments) {
            state.allComments = comments;
        },
        [Types.ADD](state, comment) {
            state.allComments.push(comment);
            state.allComments.sort(state.sortPredicate);
        },
        [Types.DELETE](state, commentId) {
            state.allComments = state.allComments.filter(
                item => item.id != commentId
            );
        },
        [Types.SET_RANGE](state, indexRange) {
            const [startIndex, endIndex] = indexRange;
            state.startSliceIndex = startIndex;
            state.endSliceIndex = endIndex;
        },
        [Types.SET_PREDICATE](state, predicate) {
            state.sortPredicate = predicate;
        },
        [Types.SET_FILTER](state, filter) {
            state.filterPredicate = filter;
        }
    }
};
