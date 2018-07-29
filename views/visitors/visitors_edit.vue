<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                <v-toolbar color="blue darken-2" dark>
                    <v-btn icon @click="backRoute">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Редактирование посетителя</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogDeleteVisitor = !dialogDeleteVisitor" >
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-toolbar>
                    <v-flex xs12>
                        <v-card-text class="pa-0 mt-2">
                            <v-flex xs12>
                                <v-text-field  v-model="visitor.name"  label="Имя посетителя" full-width  hide-details></v-text-field>
                                <v-text-field  v-model="visitor.email"  label="Email" full-width  hide-details></v-text-field>
                                <v-text-field  v-model="visitor.phone"  label="Телефон" full-width  hide-details></v-text-field>
                            </v-flex>
                        </v-card-text>
                        <v-card-actions>
                            <v-flex xs12>
                                <v-btn color="success" @click="submit">Сохранить</v-btn>
                            </v-flex>
                        </v-card-actions>
                    </v-flex>
                </v-card>
            </v-flex>
        </v-layout>


        <!--MODALS -->
        <v-dialog v-model="dialogDeleteVisitor" max-width="500px">
            <v-card>
                <v-card-text>
                    <v-flex sm12>
                        Вы действительно хотите удалить посетителя <b>{{visitor.name}} ?</b>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  color="red" @click="deleteVisitor" >Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                visitor: {},
                dialogDeleteVisitor: false,
            };
        },
        created: function () {
            this.init();
            this.getVisitor();

        },
        methods: {
            init(){

            },

            getVisitor(){
                let uri = '/api/visitors/' + this.$route.params.id + '/edit';
                this.axios.get(uri).then((response) => {
                    this.visitor = response.data;

                }).catch(function (error) {
                });



            },
            deleteVisitor(){
                this.axios.delete('/api/visitors/' + this.$route.params.id).then((response) => {

                        this.$notify({
                            group: 'info',
                            type: 'success',
                            title: 'Успех',
                            text: 'Посетитель удален!'
                        });
                        this.$router.push({name: 'visitors'});
                }).catch(function (error) {
                   console.log(error);
                });

            },
            submit() {  
                this.axios.patch('/api/visitors/'+this.$route.params.id , this.visitor).then((response) => {
                    this.$notify({
                        group:'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Посетитель обновлен!'
                    });
                    this.$router.push({name:'visitors'});
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

</style>