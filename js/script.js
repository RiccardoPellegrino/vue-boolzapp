// Milestone 1
// ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
// dall’interlocutore (bianco) assegnando due classi CSS diverse
// ● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
// nome e immagine di ogni contatto
// Milestone 2
// ● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
// messaggi relativi al contatto attivo all’interno del pannello della conversazione
// ● Click sul contatto mostra la conversazione del contatto cliccato

var DateTime = luxon.DateTime;

const FORMATO_ORA = "dd/MM/yyyy HH:mm:ss";
const { createApp } = Vue;

const app = createApp({
    data() {
        return {
           
            iconaInvio: 'fa-microphone',
            risposte: ['Non posso rispondere', 'Chiamami piu tardi', 'Ci vediamo lunedi', 'Sono occupato sentiamoci dopo', 'Ho un sacco di patate'],
            currentChat: 0,
            newMessage: '',
            searchTerm: '',
            messaggiVisualizzati: [
                {
                    testo: ''
                }
            ],
            contacts: [
                {
                    id: 1,
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 2,
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id: 3,
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 4,
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 5,
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 6,
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id: 7,
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 8,
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]

        }
    },
    computed: {
        cercaContatto() {
            return this.contacts.filter((item) => {
                const name = item.name.toLowerCase();
                console.log(name);
                return name.includes(this.searchTerm.toLowerCase())
            })
        }
    },

    methods: {

        onClickContatto(idContatto) {
            this.currentChat = this.contacts.findIndex((pippo) => pippo.id === idContatto)
        },

        sendMessage() {
            if (!this.newMessage) return;

            // const d = new Date();
            // let newDate = d.toDateString();
            
            let newDate = DateTime.now()
                .setLocale("it")
                .toFormat(FORMATO_ORA);
            const newSentMessage = {
                date: newDate,
                message: this.newMessage,
                status: 'sent'
            }
            this.contacts[this.currentChat].messages.push(newSentMessage);
            this.newMessage = '';
            this.impostaIconaInvio();

            setTimeout(() => {
                // messaggio casuale
                indiceMessaggioCasuale = Math.floor(Math.random() * this.risposte.length);
                messaggioCasuale = this.risposte[indiceMessaggioCasuale];
                let newDate = DateTime.now()
                .setLocale("it")
                .toFormat(FORMATO_ORA);
                const newSentMessage = {
                    date: newDate,
                    message: messaggioCasuale,
                    status: 'received'
                }
                this.contacts[this.currentChat].messages.push(newSentMessage);

            }, 1000);

        },
        getLastMessage(item) {
            const msg = item.messages.filter((message) => {
                return message.status === 'received';
            })
            console.log(msg);
            return msg[msg.length - 1];
        },

        impostaIconaInvio() {
            if (this.newMessage) {
                this.iconaInvio = 'fa-paper-plane';

            } else {
                this.iconaInvio = 'fa-microphone';
            }
            console.log('staScrivendo');
        },

    }
}).mount('#app')

