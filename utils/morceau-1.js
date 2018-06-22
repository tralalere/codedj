var pattern = new Pattern()
var pattern1 = new Pattern()
var pattern2 = new Pattern()
var pattern3 = new Pattern()
var pattern4 = new Pattern()
var pattern5 = new Pattern()
var pattern6 = new Pattern()
var pattern7 = new Pattern()
var pattern8 = new Pattern()
var pattern9 = new Pattern()
var patternVide = new Pattern('vide')

var morceau_1 = new Tune()

morceau_1.add(
    pattern,
    patternVide,
    pattern1,
    patternVide,
    pattern2,
    patternVide,
    pattern3,
    patternVide,
    pattern3,
    patternVide,
    pattern4,
    patternVide,
    pattern5,
    patternVide,
    pattern6,
    patternVide,
    pattern5,
    patternVide,
    pattern7,
    patternVide,
    pattern8,
    patternVide,
    pattern8,
    patternVide,
    pattern9,
    patternVide)

var piano_a = new Instrument("beats/monde-1/A/1 - PIANO.mp3")
var piano_b = new Instrument("beats/monde-1/B/1 - PIANO.mp3")
var piano_c = new Instrument("beats/monde-1/C/2 - PIANO.mp3")
var piano_e = new Instrument("beats/monde-1/E/2 - PIANO.mp3")
var piano_f = new Instrument("beats/monde-1/F/3 - PIANO.mp3")
var piano_g = new Instrument("beats/monde-1/G/4 - PIANO.mp3")
var piano_h = new Instrument("beats/monde-1/H/5 - PIANO.mp3")

var kick_b = new Instrument("beats/monde-1/B/ONE SHOT/KICK.mp3")
var snare_b = new Instrument("beats/monde-1/B/ONE SHOT/SNARE.mp3")


var drum_b = new Instrument("beats/monde-1/B/1 - DRUMS.mp3")
var drum_d = new Instrument("beats/monde-1/D/2 - DRUMS.mp3")
var drum_g = new Instrument("beats/monde-1/G/3 - DRUMS.mp3")

var bass_b = new Instrument("beats/monde-1/B/1 - BASS.mp3")
var bass_d = new Instrument("beats/monde-1/D/2 - BASS.mp3")
var bass_g = new Instrument("beats/monde-1/G/3 - BASS.mp3")

var voix_a = new Instrument("beats/monde-1/A/1 - VOIX 1.mp3")
var voix_b = new Instrument("beats/monde-1/B/1 - VOIX 1.mp3")
var voix_b_2 = new Instrument("beats/monde-1/B/1 - VOIX 2.mp3")
var voix_d_2 = new Instrument("beats/monde-1/D/2 - VOIX 2.mp3")
var voix_f_2 = new Instrument("beats/monde-1/F/3 - VOIX 2.mp3")
var voix_g_3 = new Instrument("beats/monde-1/G/1 - VOIX 3.mp3")
var voix_g_4 = new Instrument("beats/monde-1/G/4 - VOIX 2.mp3")
var voix_g_2 = new Instrument("beats/monde-1/G/2 - VOIX 1.mp3")

var synth_g = new Instrument("beats/monde-1/G/1 - SYNTH.mp3")

var arp_e = new Instrument("beats/monde-1/E/1 - ARP.mp3")

pattern.addSound(piano_b, 1)

pattern1.addSound(piano_b, 1)
pattern1.addSound(voix_b, 1)

pattern2.addSound(piano_b, 1)
pattern2.addSound(voix_b, 1)
pattern2.addSound(voix_b_2, 1)

pattern3.addSound(piano_b, 1)
pattern3.addSound(voix_b, 1)
pattern3.addSound(voix_b_2, 1)
pattern3.addSound(bass_b, 1)
pattern3.addSound(drum_b, 1)



pattern4.addSound(voix_b, 1)
pattern4.addSound(arp_e, 1)
pattern4.addSound(piano_e, 1)

pattern5.addSound(piano_e, 1)
pattern5.addSound(arp_e, 1)
pattern5.addSound(voix_d_2, 1)
pattern5.addSound(drum_d, 1)
pattern5.addSound(bass_d, 1)

pattern6.addSound(piano_e, 1)
pattern6.addSound(arp_e, 1)
pattern6.addSound(voix_b, 1)


pattern7.addSound(piano_f, 1)
pattern7.addSound(voix_f_2, 1)

pattern8.addSound(piano_g, 1)
pattern8.addSound(drum_g, 1)
pattern8.addSound(bass_g, 1)
pattern8.addSound(voix_g_2, 1)
pattern8.addSound(voix_g_3, 1)
pattern8.addSound(voix_g_4, 1)
pattern8.addSound(synth_g, 1)

pattern9.addSound(piano_h, 1)

/*********************/
    pattern3.addSound(kick_b, 1)
    pattern3.addSound(kick_b, 2.5)
    pattern3.addSound(kick_b, 3)
    pattern3.addSound(kick_b, 4.75)
    pattern3.addSound(kick_b, 5)
    pattern3.addSound(kick_b, 5.5)
    pattern3.addSound(kick_b, 6.5)
    pattern3.addSound(kick_b, 7)
    pattern3.addSound(kick_b, 9)
    pattern3.addSound(kick_b, 10.5)
    pattern3.addSound(kick_b, 11)
    pattern3.addSound(kick_b, 12.75)
    pattern3.addSound(kick_b, 13.5)
    pattern3.addSound(kick_b, 14.5)
    pattern3.addSound(kick_b, 15)
    pattern3.addSound(kick_b, 16.75)
    pattern3.addSound(kick_b, 17)
    pattern3.addSound(kick_b, 18.5)
    pattern3.addSound(kick_b, 19)
    pattern3.addSound(kick_b, 20.75)
    pattern3.addSound(kick_b, 21)
    pattern3.addSound(kick_b, 21.5)
    pattern3.addSound(kick_b, 22.5)
    pattern3.addSound(kick_b, 23)
    pattern3.addSound(kick_b, 25)
    pattern3.addSound(kick_b, 26.5)
    pattern3.addSound(kick_b, 27)
    pattern3.addSound(kick_b, 28.75)
    pattern3.addSound(kick_b, 29.5)
    pattern3.addSound(kick_b, 30.5)
    pattern3.addSound(kick_b, 31)
    pattern3.addSound(kick_b, 32.75)



morceau_1.play()


