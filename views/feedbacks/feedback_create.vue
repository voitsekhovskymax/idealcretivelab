<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Создание нового отзыва</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-card-text >
                    <v-flex xs12>
                        <v-text-field  v-model="feedback.name"  label="Автор отзыва" full-width  hide-details></v-text-field>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12>
                        <v-text-field  v-model="feedback.title"  label="Заголовок отзыва" full-width  hide-details></v-text-field>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12>
                        <v-text-field  v-model="feedback.content"  label="Содержание отзыва" multi-line full-width  hide-details></v-text-field>
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
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                feedback: {},
                portfolios:[]
            };
        },
        created: function () {
   
            this.getPortfolios();
        },
        methods: {
            getPortfolios(){
                this.axios.get('/api/all_portfolios').then((response) => {
                    this.portfolios = response.data;
                    console.log(this.portfolios);
                });
            },
            submit() {
                console.log(this.feedback);
                this.axios.post('/api/feedbacks', this.feedback).then((response) => {
                    this.$notify({
                        group:'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Новый отзыв создан!'
                    });
                    this.$router.push({name:'feedbacks'});
                }).catch(function (error) {
                   console.log(error);
                });
            },
            backRoute(){
                this.$router.go(-1)
            }

        }
    };




</script>


<style>
    #urlIMG {max-width: 100%;max-height: 100%}
    .imgpost {height: 100px; width: 100%; text-align: center; cursor: pointer}
    .divider {margin: 0px !important;}
    #note_ifr {height: 300px ;}

</style>