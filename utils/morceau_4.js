var pattern = new Pattern()
var pattern1 = new Pattern()
var pattern2 = new Pattern()
var pattern3 = new Pattern()
var pattern4 = new Pattern()
var pattern5 = new Pattern()
var pattern6 = new Pattern()
var pattern7 = new Pattern()
var patternVide = new Pattern('vide')

var morceau_2 = new Tune()

var hh = new Instrument("samples/G1/HH.mp3")
var kick = new Instrument("samples/G1/KICK.mp3")
var rim = new Instrument("samples/G1/RIM.mp3")
var snare = new Instrument("samples/G1/SNARE.mp3")
var shaker = new Instrument("samples/G1/SHAKER_1.mp3")

var clap_g2 = new Instrument("samples/G2/CLAP.mp3")
var kick_g2 = new Instrument("samples/G2/KICK.mp3")
var snare_g2 = new Instrument("samples/G2/SNARE.mp3")
var hat = new Instrument("samples/G2/HAT.mp3")

var clap_g3 = new Instrument("samples/G3/CLAP.mp3")
var kick_g3 = new Instrument("samples/G3/KICK.mp3")
var snare_g3 = new Instrument("samples/G3/SNARE.mp3")
var hat_g3 = new Instrument("samples/G3/HH.mp3")


var conga  = new Instrument()

conga.addSample('CongaA','samples/G1/CONGA_1.mp3')
conga.addSample('CongaB','samples/G1/CONGA_2.mp3')
conga.addSample('CongaC','samples/G1/CONGA_3.mp3')

var arp_g3 = new Instrument("beats/monde-2/G3/A/1 - ARP.mp3")
var arp_d_g3 = new Instrument("beats/monde-2/G3/D/2 - ARP.mp3")
var piano_g3 = new Instrument("beats/monde-2/G3/A/1 - PIANO.mp3")
var piano_d_g3 = new Instrument("beats/monde-2/G3/D/1 - PIANO.mp3")
var voix_g3 = new Instrument("beats/monde-2/G3/A/1 - VOIX.mp3")
var bass_g3 = new Instrument("beats/monde-2/G3/B/1 - BASS.mp3")
var synth_g3 = new Instrument("beats/monde-2/G3/C/1 - SYNTH.mp3")
var voix_c_g3 = new Instrument("beats/monde-2/G3/C/2 - VOIX.mp3")




temp = 130

morceau_2.add(
    pattern,
    patternVide,
    pattern1,
    patternVide,
    pattern2,
    patternVide,
    pattern3,
    patternVide,
    pattern4,
    patternVide,
    pattern5,
    patternVide,
    pattern6,
    patternVide,
    pattern7,
)

pattern.addSound(arp_g3, 1)

pattern1.addSound(arp_g3, 1)
pattern1.addSound(piano_g3, 1)

pattern2.addSound(arp_g3, 1)
pattern2.addSound(piano_g3, 1)
pattern2.addSound(voix_g3, 1)

pattern3.addSound(arp_d_g3, 1)
pattern3.addSound(piano_g3, 1)
pattern3.addSound(voix_g3, 1)
pattern3.addSound(bass_g3, 1)
pattern3.addSound(kick_g3, 1)
pattern3.addSound(kick_g3, 4.5)
pattern3.addSound(kick_g3, 5)
pattern3.addSound(kick_g3, 7.5)
pattern3.addSound(kick_g3, 9)
pattern3.addSound(kick_g3, 13)
pattern3.addSound(kick_g3, 16.75)

pattern3.addSound(hat_g3, 1)
pattern3.addSound(hat_g3, 3)
pattern3.addSound(hat_g3, 5)
pattern3.addSound(hat_g3, 7)
pattern3.addSound(hat_g3, 9)
pattern3.addSound(hat_g3, 11)
pattern3.addSound(hat_g3, 13)
pattern3.addSound(hat_g3, 15)

pattern3.addSound(snare_g3, 3)
pattern3.addSound(snare_g3, 7)
pattern3.addSound(snare_g3, 11)
pattern3.addSound(snare_g3, 15)

pattern3.addSound(clap_g3, 3)
pattern3.addSound(clap_g3, 7)
pattern3.addSound(clap_g3, 11)
pattern3.addSound(clap_g3, 15)

pattern4.addSound(arp_d_g3, 1)
pattern4.addSound(synth_g3, 1)
pattern4.addSound(voix_c_g3, 1)


pattern5.addSound(arp_d_g3, 1)
pattern5.addSound(synth_g3, 1)
pattern5.addSound(voix_c_g3, 1)
pattern5.addSound(kick_g3, 1)
pattern5.addSound(kick_g3, 2)
pattern5.addSound(kick_g3, 3)
pattern5.addSound(kick_g3, 4)
pattern5.addSound(kick_g3, 5)
pattern5.addSound(kick_g3, 6)
pattern5.addSound(kick_g3, 7)
pattern5.addSound(kick_g3, 8)
pattern5.addSound(kick_g3, 9)
pattern5.addSound(kick_g3, 10)
pattern5.addSound(kick_g3, 11)
pattern5.addSound(kick_g3, 12)
pattern5.addSound(kick_g3, 13)
pattern5.addSound(kick_g3, 14)
pattern5.addSound(kick_g3, 15)
pattern5.addSound(kick_g3, 16)

pattern5.addSound(clap_g3, 2)
pattern5.addSound(clap_g3, 4)
pattern5.addSound(clap_g3, 6)
pattern5.addSound(clap_g3, 8)
pattern5.addSound(clap_g3, 10)
pattern5.addSound(clap_g3, 12)
pattern5.addSound(clap_g3, 14)
pattern5.addSound(clap_g3, 16)

pattern6.addSound(voix_c_g3, 1)
pattern6.addSound(synth_g3, 1)
pattern6.addSound(bass_g3, 1)
pattern6.addSound(kick_g3, 1)
pattern6.addSound(kick_g3, 4.5)
pattern6.addSound(kick_g3, 5)
pattern6.addSound(kick_g3, 7.5)
pattern6.addSound(kick_g3, 9)
pattern6.addSound(kick_g3, 13)
pattern6.addSound(kick_g3, 16.75)

pattern6.addSound(hat_g3, 1)
pattern6.addSound(hat_g3, 3)
pattern6.addSound(hat_g3, 5)
pattern6.addSound(hat_g3, 7)
pattern6.addSound(hat_g3, 9)
pattern6.addSound(hat_g3, 11)
pattern6.addSound(hat_g3, 13)
pattern6.addSound(hat_g3, 15)

pattern6.addSound(snare_g3, 3)
pattern6.addSound(snare_g3, 7)
pattern6.addSound(snare_g3, 11)
pattern6.addSound(snare_g3, 15)

pattern6.addSound(clap_g3, 3)
pattern6.addSound(clap_g3, 7)
pattern6.addSound(clap_g3, 11)
pattern6.addSound(clap_g3, 15)


pattern7.addSound(piano_d_g3, 1)
pattern7.addSound(arp_d_g3, 1)
pattern7.addSound(voix_g3, 1)
pattern7.addSound(bass_g3, 1)
pattern7.addSound(kick_g3, 1)
pattern7.addSound(kick_g3, 4.5)
pattern7.addSound(kick_g3, 5)
pattern7.addSound(kick_g3, 7.5)
pattern7.addSound(kick_g3, 9)
pattern7.addSound(kick_g3, 13)
pattern7.addSound(kick_g3, 16.75)

pattern7.addSound(hat_g3, 1)
pattern7.addSound(hat_g3, 3)
pattern7.addSound(hat_g3, 5)
pattern7.addSound(hat_g3, 7)
pattern7.addSound(hat_g3, 9)
pattern7.addSound(hat_g3, 11)
pattern7.addSound(hat_g3, 13)
pattern7.addSound(hat_g3, 15)

pattern7.addSound(snare_g3, 3)
pattern7.addSound(snare_g3, 7)
pattern7.addSound(snare_g3, 11)
pattern7.addSound(snare_g3, 15)

pattern7.addSound(clap_g3, 3)
pattern7.addSound(clap_g3, 7)
pattern7.addSound(clap_g3, 11)
pattern7.addSound(clap_g3, 15)

morceau_2.play()
