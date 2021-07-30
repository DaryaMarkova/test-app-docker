import { commentDataService } from "./../data/api";

export const Types = {
    LOAD: "loadComments",
    ADD: "createComment",
    DELETE: "deleteComment",
    SET_RANGE: "setDataRange",
    SET_PREDICATE: "setSortPredicate"
};

export const Store = {
    state() {
        return {
            allComments: [],
            sortPredicate: () => 1,
            startSliceIndex: 0,
            endSliceIndex: 0
        };
    },
    getters: {
        displayedComments(state) {
            const { sortPredicate, startSliceIndex, endSliceIndex } = state;

            return state.allComments
                .sort(sortPredicate)
                .slice(
                    startSliceIndex,
                    endSliceIndex > 0 ? endSliceIndex : state.allComments.length
                );
        }
    },
    // TODO: proper error handling
    actions: {
        async [Types.LOAD]({ commit }) {
            commentDataService
                .fetchComments()
                .then(list => commit(Types.LOAD, list))
                .catch(() => commit(Types.LOAD, []));
        },
        [Types.ADD]({ commit }, comment) {
            commentDataService
                .createComment(comment)
                .then(createdComment => commit(Types.ADD, createdComment))
                .catch(() => commit({}));
        },
        [Types.DELETE]({ commit }, commentId) {
            commentDataService
                .deleteComment(commentId)
                .then(() => commit(Types.DELETE, commentId));
        },
        [Types.SET_RANGE]({ commit }, range) {
            commit(Types.SET_RANGE, range);
        },
        [Types.SET_PREDICATE]({ commit }, predicate) {
            commit(Types.SET_PREDICATE, predicate);
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
        }
    }
};
