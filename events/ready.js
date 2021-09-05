module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        client.user.setActivity('Skripsi');
        console.log(`${client.user.tag} is now online`);
    }
}