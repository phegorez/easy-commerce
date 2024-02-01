import { defineStore } from "pinia";

export const useAdminUserStore = defineStore("user", {
    state: () => ({
        usersList: [{
            name: 'Man',
            role: 'admin',
            status: 'active',
            updatedAt: (new Date()).toLocaleString()
        }]
    }),
    actions: {
        getUser(index) {
            return this.usersList[index]
        },
        updateUser(index, userData) {
            const fields = ['name', 'role', 'status']
            for(let field of fields) {
                this.usersList[index][field] = userData[field]
            }
            this.usersList[index].updatedAt = (new Date()).toLocaleString();
        },
        removeUser(index) {
            this.list.splice(index, 1)
        },
    },
    getters: {

    },
});