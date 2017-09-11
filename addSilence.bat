
sox -n -c 2 ./silence.wav trim 0.0 %2
sox ./silence.wav %1 %3

rm ./silence.wav
echo "%2"
