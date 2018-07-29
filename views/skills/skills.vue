<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Скиллы</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon :to="{ name: 'skill_create' }">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-list two-line>
                    <template v-for="item in skills">
                        <v-list-tile avatar v-bind:key="item.title" :to="{name: 'skill_edit', params: { id: item.id }}">
                            <v-list-tile-avatar>
                                <img v-bind:src="item.img">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.created_at"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                skills: {}
            };
        },
        created: function () {
            this.getSkills();
        },
        methods: {

            getSkills() {
                this.axios.get('/api/skills').then((response) => {
                    this.skills = response.data;
                    console.log(this.skills);
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    }
</script>