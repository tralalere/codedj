var pattern = new Pattern()
var pattern1 = new Pattern()
var pattern2 = new Pattern()
var pattern3 = new Pattern()
var pattern4 = new Pattern()
var pattern5 = new Pattern()
var pattern6 = new Pattern()
var patternVide = new Pattern('vide')

var morceau_2 = new Tune()

var hh = new Instrument("samples/G1/HH.mp3")
var kick = new Instrument("samples/G1/KICK.mp3")
var rim = new Instrument("samples/G1/RIM.mp3")
var snare = new Instrument("samples/G1/SNARE.mp3")
var shaker = new Instrument("samples/G1/SHAKER_1.mp3")
var conga  = new Instrument()

conga.addSample('CongaA','samples/G1/CONGA_1.mp3')
conga.addSample('CongaB','samples/G1/CONGA_2.mp3')
conga.addSample('CongaC','samples/G1/CONGA_3.mp3')

var drum_d = new Instrument("beats/monde-1/D/2 - DRUMS.mp3")

var piano_a_g1 = new Instrument("beats/monde-2/G1/A/1 - PIANO.mp3")

var arp_a_g1 = new Instrument("beats/monde-2/G1/A/1 - ARP 1.mp3")
var arp_c_g1 = new Instrument("beats/monde-2/G1/C/1 - ARP 2.mp3")
var arp_d_g1 = new Instrument("beats/monde-2/G1/D/2 - ARP 2.mp3")

var synth_1_c_g1 = new Instrument("beats/monde-2/G1/C/1 - SYNTH 1.mp3")
var synth_2_c_g1 = new Instrument("beats/monde-2/G1/C/1 - SYNTH 2.mp3")
var synth_d_g1 = new Instrument("beats/monde-2/G1/D/2 - SYNTH 2.mp3")

var pad_c_g1 = new Instrument("beats/monde-2/G1/C/1 - PAD.mp3")

var voix_a_g1 = new Instrument("beats/monde-2/G1/A/1 - VOIX 1.mp3")
var voix_2_d_g1 = new Instrument("beats/monde-2/G1/D/2 - VOIX 1.mp3")
var voix_1_d_g1 = new Instrument("beats/monde-2/G1/D/1 - VOIX 2.mp3")


var bass_b_g1 = new Instrument("beats/monde-2/G1/B/1 - BASS.mp3")
var bass_d_g1 = new Instrument("beats/monde-2/G1/D/2 - BASS.mp3")

temp = 130

//morceau_2.add(pattern,pattern1,pattern2,pattern3,pattern4,pattern5,pattern2,pattern3,pattern6)

pattern.addSound(piano_a_g1,1)

pattern1.addSound(piano_a_g1,1)
pattern1.addSound(arp_a_g1,1)


pattern2.addSound(piano_a_g1,1)
pattern2.addSound(arp_a_g1,1)
pattern2.addSound(voix_a_g1,1)

pattern3.addSound(drum_d,1)
pattern3.addSound(bass_b_g1,1)
pattern3.addSound(piano_a_g1,1)
pattern3.addSound(arp_a_g1,1)
pattern3.addSound(voix_a_g1,1)

pattern4.addSound(arp_c_g1,1)
pattern4.addSound(pad_c_g1,1)
pattern4.addSound(synth_1_c_g1,1)
pattern4.addSound(synth_2_c_g1,1)
pattern4.addSound(voix_a_g1,1)

pattern5.addSound(synth_d_g1, 1)
//pattern5.addSound(bass_d_g1, 1)
pattern5.addSound(kick, 1)
pattern5.addSound(kick, 3.5)
pattern5.addSound(kick, 4.5)
pattern5.addSound(kick, 5)
pattern5.addSound(kick, 8.75)
pattern5.addSound(kick, 9)
pattern5.addSound(kick, 11.5)
pattern5.addSound(kick, 12.5)
pattern5.addSound(kick, 13)
pattern5.addSound(kick, 16.5)
pattern5.addSound(kick, 16.75)
pattern5.addSound(kick, 17)
pattern5.addSound(kick, 19.5)
pattern5.addSound(kick, 20.5)
pattern5.addSound(kick, 21)
pattern5.addSound(kick, 24.75)
pattern5.addSound(kick, 25)
pattern5.addSound(kick, 27.5)
pattern5.addSound(kick, 28.5)
pattern5.addSound(kick, 29)
pattern5.addSound(kick, 32.5)
pattern5.addSound(kick, 32.75)

pattern5.addSound(snare, 3)
pattern5.addSound(snare, 7)
pattern5.addSound(snare, 11)
pattern5.addSound(snare,15)
pattern5.addSound(snare, 19)
pattern5.addSound(snare, 23)
pattern5.addSound(snare, 27)
pattern5.addSound(snare, 31)

pattern5.addSound(rim, 2)
pattern5.addSound(rim, 6)
pattern5.addSound(rim, 10)
pattern5.addSound(rim,14)
pattern5.addSound(rim, 18)
pattern5.addSound(rim, 22)
pattern5.addSound(rim, 26)
pattern5.addSound(rim, 30)

pattern5.addSound(conga.CongaA, 1)
pattern5.addSound(conga.CongaA, 2.5)
pattern5.addSound(conga.CongaA, 8.5)
pattern5.addSound(conga.CongaA, 9)
pattern5.addSound(conga.CongaA, 10.5)
pattern5.addSound(conga.CongaA, 16.5)
pattern5.addSound(conga.CongaA, 17)
pattern5.addSound(conga.CongaA, 18.5)
pattern5.addSound(conga.CongaA, 24.5)
pattern5.addSound(conga.CongaA, 25)
pattern5.addSound(conga.CongaA, 26.5)
pattern5.addSound(conga.CongaA, 32.5)

pattern5.addSound(conga.CongaB, 2.75)
pattern5.addSound(conga.CongaB, 4.5)
pattern5.addSound(conga.CongaB, 4.75)
pattern5.addSound(conga.CongaB, 5.5)
pattern5.addSound(conga.CongaB, 5.75)
pattern5.addSound(conga.CongaB, 6.5)
pattern5.addSound(conga.CongaB, 6.75)
pattern5.addSound(conga.CongaB, 8.75)
pattern5.addSound(conga.CongaB, 10.75)
pattern5.addSound(conga.CongaB, 12.5)
pattern5.addSound(conga.CongaB, 12.75)
pattern5.addSound(conga.CongaB, 13.5)
pattern5.addSound(conga.CongaB, 13.75)
pattern5.addSound(conga.CongaB, 14.5)
pattern5.addSound(conga.CongaB, 14.75)
pattern5.addSound(conga.CongaB, 16.75)

pattern5.addSound(conga.CongaB, 18.75)
pattern5.addSound(conga.CongaB, 20.5)
pattern5.addSound(conga.CongaB, 20.75)
pattern5.addSound(conga.CongaB, 21.5)
pattern5.addSound(conga.CongaB, 21.75)
pattern5.addSound(conga.CongaB, 22.5)
pattern5.addSound(conga.CongaB, 22.75)
pattern5.addSound(conga.CongaB, 24.75)
pattern5.addSound(conga.CongaB, 26.75)
pattern5.addSound(conga.CongaB, 28.5)
pattern5.addSound(conga.CongaB, 28.75)
pattern5.addSound(conga.CongaB, 29.5)
pattern5.addSound(conga.CongaB, 29.75)
pattern5.addSound(conga.CongaB, 30.5)
pattern5.addSound(conga.CongaB, 30.75)
pattern5.addSound(conga.CongaB, 32.75)

pattern5.addSound(conga.CongaC, 3)
pattern5.addSound(conga.CongaC, 11)
pattern5.addSound(conga.CongaC, 19)
pattern5.addSound(conga.CongaC, 27)

pattern5.addSound(piano_a_g1, 1)
pattern5.addSound(arp_d_g1, 1)

pattern5.addSound(voix_2_d_g1, 1)
pattern5.addSound(voix_1_d_g1, 1)

pattern6.addSound(synth_d_g1, 1)
pattern6.addSound(arp_d_g1, 1)
pattern6.addSound(piano_a_g1, 1)

morceau_2.play()

/********************** VERSION 2************************/
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
var conga  = new Instrument()

conga.addSample('CongaA','samples/G1/CONGA_1.mp3')
conga.addSample('CongaB','samples/G1/CONGA_2.mp3')
conga.addSample('CongaC','samples/G1/CONGA_3.mp3')

var drum_d = new Instrument("beats/monde-1/D/2 - DRUMS.mp3")

var piano_a_g1 = new Instrument("beats/monde-2/G1/A/1 - PIANO.mp3")

var arp_a_g1 = new Instrument("beats/monde-2/G1/A/1 - ARP 1.mp3")
var arp_c_g1 = new Instrument("beats/monde-2/G1/C/1 - ARP 2.mp3")
var arp_d_g1 = new Instrument("beats/monde-2/G1/D/2 - ARP 2.mp3")

var synth_1_c_g1 = new Instrument("beats/monde-2/G1/C/1 - SYNTH 1.mp3")
var synth_2_c_g1 = new Instrument("beats/monde-2/G1/C/1 - SYNTH 2.mp3")
var synth_d_g1 = new Instrument("beats/monde-2/G1/D/2 - SYNTH 2.mp3")

var pad_c_g1 = new Instrument("beats/monde-2/G1/C/1 - PAD.mp3")

var voix_a_g1 = new Instrument("beats/monde-2/G1/A/1 - VOIX 1.mp3")
var voix_2_d_g1 = new Instrument("beats/monde-2/G1/D/2 - VOIX 1.mp3")
var voix_1_d_g1 = new Instrument("beats/monde-2/G1/D/1 - VOIX 2.mp3")


var bass_b_g1 = new Instrument("beats/monde-2/G1/B/1 - BASS.mp3")
var bass_d_g1 = new Instrument("beats/monde-2/G1/D/2 - BASS.mp3")

temp = 130

morceau_2.add(pattern,
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
    pattern6,
    patternVide,
    pattern7)

pattern.addSound(piano_a_g1,1)

pattern1.addSound(piano_a_g1,1)
pattern1.addSound(arp_a_g1,1)


pattern2.addSound(piano_a_g1,1)
pattern2.addSound(arp_a_g1,1)
pattern2.addSound(voix_a_g1,1)

pattern3.addSound(drum_d,1)
pattern3.addSound(bass_b_g1,1)
pattern3.addSound(piano_a_g1,1)
pattern3.addSound(arp_a_g1,1)
pattern3.addSound(voix_a_g1,1)

pattern4.addSound(arp_c_g1,1)
pattern4.addSound(pad_c_g1,1)
pattern4.addSound(synth_1_c_g1,1)
pattern4.addSound(synth_2_c_g1,1)
pattern4.addSound(voix_a_g1,1)

pattern5.addSound(synth_d_g1, 1)
//pattern5.addSound(bass_d_g1, 1)
pattern5.addSound(kick, 1)
pattern5.addSound(kick, 3.5)
pattern5.addSound(kick, 4.5)
pattern5.addSound(kick, 5)
pattern5.addSound(kick, 8.75)
pattern5.addSound(kick, 9)
pattern5.addSound(kick, 11.5)
pattern5.addSound(kick, 12.5)
pattern5.addSound(kick, 13)
pattern5.addSound(kick, 16.5)
pattern5.addSound(kick, 16.75)


pattern5.addSound(snare, 3)
pattern5.addSound(snare, 7)
pattern5.addSound(snare, 11)
pattern5.addSound(snare,15)


pattern5.addSound(rim, 2)
pattern5.addSound(rim, 6)
pattern5.addSound(rim, 10)
pattern5.addSound(rim,14)


pattern5.addSound(conga.CongaA, 1)
pattern5.addSound(conga.CongaA, 2.5)
pattern5.addSound(conga.CongaA, 8.5)
pattern5.addSound(conga.CongaA, 9)
pattern5.addSound(conga.CongaA, 10.5)
pattern5.addSound(conga.CongaA, 16.5)


pattern5.addSound(conga.CongaB, 2.75)
pattern5.addSound(conga.CongaB, 4.5)
pattern5.addSound(conga.CongaB, 4.75)
pattern5.addSound(conga.CongaB, 5.5)
pattern5.addSound(conga.CongaB, 5.75)
pattern5.addSound(conga.CongaB, 6.5)
pattern5.addSound(conga.CongaB, 6.75)
pattern5.addSound(conga.CongaB, 8.75)
pattern5.addSound(conga.CongaB, 10.75)
pattern5.addSound(conga.CongaB, 12.5)
pattern5.addSound(conga.CongaB, 12.75)
pattern5.addSound(conga.CongaB, 13.5)
pattern5.addSound(conga.CongaB, 13.75)
pattern5.addSound(conga.CongaB, 14.5)
pattern5.addSound(conga.CongaB, 14.75)
pattern5.addSound(conga.CongaB, 16.75)

pattern5.addSound(conga.CongaC, 3)
pattern5.addSound(conga.CongaC, 11)


pattern5.addSound(piano_a_g1, 1)
pattern5.addSound(arp_d_g1, 1)

pattern5.addSound(voix_2_d_g1, 1)
pattern5.addSound(voix_1_d_g1, 1)



pattern6.addSound(synth_d_g1, 1)
//pattern6.addSound(bass_d_g1, 1)
pattern6.addSound(kick, 1)
pattern6.addSound(kick, 3.5)
pattern6.addSound(kick, 4.5)
pattern6.addSound(kick, 5)
pattern6.addSound(kick, 8.75)
pattern6.addSound(kick, 9)
pattern6.addSound(kick, 11.5)
pattern6.addSound(kick, 12.5)
pattern6.addSound(kick, 13)
pattern6.addSound(kick, 16.5)
pattern6.addSound(kick, 16.75)

pattern6.addSound(snare, 3)
pattern6.addSound(snare, 7)
pattern6.addSound(snare, 11)
pattern6.addSound(snare,15)

pattern6.addSound(rim, 2)
pattern6.addSound(rim, 6)
pattern6.addSound(rim, 10)
pattern6.addSound(rim,14)

pattern6.addSound(conga.CongaA, 1)
pattern6.addSound(conga.CongaA, 2.5)
pattern6.addSound(conga.CongaA, 8.5)
pattern6.addSound(conga.CongaA, 9)
pattern6.addSound(conga.CongaA, 10.5)
pattern6.addSound(conga.CongaA, 16.5)

pattern6.addSound(conga.CongaB, 2.75)
pattern6.addSound(conga.CongaB, 4.5)
pattern6.addSound(conga.CongaB, 4.75)
pattern6.addSound(conga.CongaB, 5.5)
pattern6.addSound(conga.CongaB, 5.75)
pattern6.addSound(conga.CongaB, 6.5)
pattern6.addSound(conga.CongaB, 6.75)
pattern6.addSound(conga.CongaB, 8.75)
pattern6.addSound(conga.CongaB, 10.75)
pattern6.addSound(conga.CongaB, 12.5)
pattern6.addSound(conga.CongaB, 12.75)
pattern6.addSound(conga.CongaB, 13.5)
pattern6.addSound(conga.CongaB, 13.75)
pattern6.addSound(conga.CongaB, 14.5)
pattern6.addSound(conga.CongaB, 14.75)
pattern6.addSound(conga.CongaB, 16.75)

pattern6.addSound(conga.CongaC, 3)
pattern6.addSound(conga.CongaC, 11)

pattern7.addSound(synth_d_g1, 1)
pattern7.addSound(arp_d_g1, 1)
pattern7.addSound(piano_a_g1, 1)





morceau_2.play()

