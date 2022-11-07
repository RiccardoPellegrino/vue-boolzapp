// A) cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio) finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, quando l'input non è vuoto si visualizza l'icona dell'aeroplano. Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono.
// B) inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano
// C) predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc
// D) visualizzare nella lista dei contatti l'ultimo messaggio inviato/ricevuto da ciascun contatto
// E) inserire l'orario corretto nei messaggi
// F) sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello stato: visualizzare il testo "sta scrivendo..." nel timeout in cui il pc risponde, poi mantenere la scritta "online" per un paio di secondi e infine visualizzare "ultimo accesso alle xx:yy" con l'orario corretto
// G) dare la possibilità all'utente di cancellare tutti i messaggi di un contatto o di cancellare l'intera chat con tutti i suoi dati: cliccando sull'icona con i tre pallini in alto a destra, si apre un dropdown menu in cui sono presenti le voci "Elimina messaggi" ed "Elimina chat"; cliccando su di essi si cancellano rispettivamente tutti i messaggi di quel contatto (quindi rimane la conversazione vuota) oppure l'intera chat comprensiva di tutti i dati del contatto oltre che tutti i suoi messaggi (quindi sparisce il contatto anche dalla lista di sinistra)
// H) dare la possibilità all'utente di aggiungere una nuova conversazione, inserendo in un popup il nome e il link all'icona del nuovo contatto
// I) fare scroll in giù in automatico fino al messaggio più recente, quando viene aggiunto un nuovo messaggio alla conversazione (NB: potrebbe esserci bisogno di utilizzare nextTick
// L) aggiungere le emoticons ai messaggi
// **Grafica**
// A) visualizzare un messaggio di benvenuto che invita l'utente a selezionare un contatto dalla lista per visualizzare i suoi messaggi, anziché attivare di default la prima conversazione
// B) aggiungere una splash page visibile per 1s all'apertura dell'app
// C) rendere l'app responsive e fruibile anche su mobile: di default si visualizza solo la lista dei contatti e cliccando su un contatto si vedono i messaggi di quel contatto.
// D) aggiungere quindi un'icona con una freccia verso sinistra per tornare indietro, dalla visualizzazione della chat alla visualizzazione di tutti i contatti
// E) aggiungere un'icona per ingrandire o rimpicciolire il font: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
// F) aggiungere un'icona per cambiare la modalità light/dark: dovrebbe essere sufficiente aggiungere una classe al wrapper principale

let DateTime = luxon.DateTime;

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
            dark:false,
            showChat: true,
            msgOpt: {
                index: null,
                show: false
            },
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
            this.currentChat = this.contacts.findIndex((pippo) => pippo.id === idContatto);
            this.onClickShow();
        },
        darkMode(){
            this.dark = !this.dark
        },
        onClickShow(){
            this.showChat=!this.showChat
        },
        sendMessage() {
            if (!this.newMessage) return;

            // const d = new Date();
            // let newDate = d.toDateString();

            let newDate = DateTime.now()
                // .setLocale("it")
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
                    // .setLocale("it")
                    .toFormat(FORMATO_ORA);
                const newSentMessage = {
                    date: newDate,
                    message: messaggioCasuale,
                    status: 'received'
                }
                this.contacts[this.currentChat].messages.push(newSentMessage);
                // momento dell update precedente all array creato usiamo nextTick la chiama dopo l update
                this.$nextTick(() => {
                    const el = this.$refs.msg[this.$refs.msg.length - 1]
                    el.scrollIntoView();
                    // cosi arrivo all ultimo messaggio 
                });


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
       
        // removeChat(obj) {
        //     !obj.visible == obj.visible;
        // },
        // removeMsg(i) {
        //     this.contacts[this.currentChat].messages.splice(i, 1);
        //     console.log(i);
        // },

        // showOption(i) {
        //     if (i === this.msgOpt.index && this.msgOpt.show) {
        //         this.msgOpt.index = null;
        //         this.msgOpt.show = false;
        //     } else {
        //         this.msgOpt.index = i;
        //         this.msgOpt.show = true;
        //     }

        // }
    }
}).mount('#app')

function myFilter(contacts, item){
    vettore = [];
    contacts.forEach(element => {
        if(element.includes(item)){
            vettore.push(element)
        }
    });
   return vettore;
}

contacts = myFilter(contacts, item)
