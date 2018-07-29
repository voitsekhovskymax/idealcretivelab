<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Редактирование отзыва</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogDeleteFeedback = !dialogDeleteFeedback">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-flex xs12>
                    <v-text-field v-model="feedback.name" label="Автор отзыва" full-width hide-details></v-text-field>
                </v-flex>
                <v-divider></v-divider>
                <v-flex xs12>
                    <v-text-field v-model="feedback.title" label="Заголовок отзыва" full-width
                                  hide-details></v-text-field>
                </v-flex>
                <v-divider></v-divider>
                <v-flex xs12>
                    <v-text-field v-model="feedback.content" label="Содержание отзыва" multi-line full-width
                                  hide-details></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-select
                            :items="portfolios"
                            item-text="title"
                            item-value="id"
                            v-model="feedback.portfolio_id"
                            label="Портфолио к которому прикрепится отзыв"
                            autocomplete
                    ></v-select>
                </v-flex>
            </v-card-text>
            <v-card-actions>
                <v-flex xs12>
                    <v-btn color="success" @click="submit">Сохранить</v-btn>
                </v-flex>
            </v-card-actions>
        </v-card>
        <!--MODALS -->
        <v-dialog v-model="dialogDeleteFeedback" max-width="500px">
            <v-card>
                <v-card-text>
                    <v-flex sm12>
                        Вы действительно хотите удалить отзыв <b>{{feedback.name}} ?</b>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="deleteFeedback">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                feedback: {},
                portfolios: [],
                dialogDeleteFeedback: false
            };
        },
        created: function () {
            this.getFeedback();
            this.getPortfolios();
        },
        methods: {
            getPortfolios() {
                this.axios.get('/api/all_portfolios').then((response) => {
                    this.portfolios = response.data;
                    console.log(this.portfolios);
                });
            },
            getFeedback() {
                let uri = '/api/feedbacks/' + this.$route.params.id + '/edit';
                this.axios.get(uri).then((response) => {
                    this.feedback = response.data;
                    console.log(this.feedback);
                }).catch(function (error) {
                });
            },
            deleteFeedback() {
                this.axios.delete('/api/feedbacks/' + this.$route.params.id).then((response) => {
                    console.log(response.data);
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Отзыв удален!'
                    });
                    this.$router.push({name: 'feedbacks'});
                }).catch(function (error) {
                    console.log(error);
                });

            },
            submit() {
                this.axios.patch('/api/feedbacks/' + this.$route.params.id, this.feedback).then((response) => {
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Отзыв обновлено!'
                    });
                    this.$router.push({name: 'feedbacks'});
                }).catch(function (error) {
                    console.log(error);
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    };


</script>


<style>
    #urlIMG {
        max-width: 100%;
        max-height: 100%
    }

    .imgpost {
        height: 100px;
        width: 100%;
        text-align: center;
        cursor: pointer
    }

    .divider {
        margin: 0px !important;
    }

    #note_ifr {
        height: 300px;
    }

</style>