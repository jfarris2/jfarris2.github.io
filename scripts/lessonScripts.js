

var letters       = "";
var currentLetter = 0;
var correctLetters = 0;
var seconds       = 0;

var lessonEnd     = false;
var start         = false;
var justEnded     = false;

var spans;
var currentLesson;
var lessonContent;
var timeStamp;

// TODO: May need to reset an initialize
var level = -1;
var lessonNumber;
var lessonPart;

var timePassed    = setInterval(updateTimer, 1000);

// Could not get the program to read from other files
// Hardcoding for now

var userInfo = {
    "name": 1,
    "wpm": 0,
    "accuracy": 0,
    "time": 0,
    "lessons": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  };

var lesson1 = {
    "0": ["jjjjjjjjjjjj", "Type the letter J with your right index finger."],
    "1": ["jjj jjj jjj ||jjj jjj jjj", "Now we are adding in the Space Bar. Use whichever thumb feels most comfortable for you."],
    "2": ["fff fff fff fff fff fff fff fff ||fff fff fff fff fff fff fff fff", "Now with your left hand, type the F key with your index finger."], 
    "3": ["jjj jjj jjj jjj fff fff fff fff ||jjj jjj fff fff jjj jjj fff fff", "You may have noticed that your keyboard has small bumps on the J and F keys. Using these bumps, you can always maintain proper hand placement without needing to look down at the keyboard!"], 
    "4": ["jjj fff jjf ffj jfj fjf ffjj jjff ||fff jjj ffj jjf fjf jfj jjff ffjj", "Just do it!"], 
    "5": ["jjf jjf jjf jjf jjf jjf jjf jjf ||ffj ffj ffj ffj ffj ffj ffj ffj ||jjj jjj jjj jjj fff fff fff fff","Just keep typing, typing, typing"], 
    "6": ["jfj jfj jfj jfj jfj jfj jfj jfj ||fjf fjf fjf fjf fjf fjf fjf fjf ||jfj fjf jfj fjf jfj fjf jfj fjf", ""],
    "7": ["jjff fffjj fjjfjfj fjfjfjjf jjjff ||ffjjf fff ffjjj jfjjjf ffjfjjf jfjf ||f j jjj fj fff ffj jjff fffj j jff", ""],
    "8": ["j f jj ff jjj fff jjjj ffff jjjjj fffff ||jf fj jjf ffj jfj fjf fffj jjjf fjfjjfj", ""], 
    "9": ["jjfjff ffjfjj jffjf jfjf ffjffj ffjjjff ||jffjf ffjfjjjjf fjjfjfjf fjfffjfjf jjfj", ""], 
    "lesson": 1,
    "wpm": [0,0,0,0,0,0,0,0,0,0],
    "accuracy": [0,0,0,0,0,0,0,0,0,0]
  };

var lesson2 = {
    "0": ["j uuu j uuu j uuu j uuu j uuu j uuu ||juu juu juu juu juu juu juj juj juj", "We will now begin typing the U key, which is on your keyboard's Top Row. Important! Your fingers should always rest lightly on the middle row keys, called the Home Row, as shown below. When typing a letter above or below the Home Row, only move that one finger, and always return to the Home Row."], 
    "1": ["f rrr f rrr f rrr f rrr f rrr f rrr ||frr frr frr frr frr frr frf frf frf", "Move your left hand's index finger up to type the R key, and immediately return to its Home Row position on the F key."], 
    "2": ["j uuu j uuu j uuu j uuu j uuu j uuu ||f rrr f rrr f rrr f rrr f rrr f rrr ||ju ju ju ju ju ju ju fr fr fr fr fr", "Remember, always keep your fingers resting on the Home Row! One finger moves, but always comes right back."], 
    "3": ["j kk j kk j kk j kk j kk j kk j kk ||jkk jkk jkk jkk jkk jkk jkj jkj jkj ||kjj jkk kjj jkk kjj jkj kjk jkj kjk", "Now that you're comfortable with your index finger, we are moving over to the middle finger on your right hand. Remember: The J key will always be typed with your index finger. Only use your middle finger to type the K key."], 
    "4": ["jjjk fffr jjkk ffrr rrff kkj rrrf k ||jk fr jkk frr kj rf frjk frjk kjrf", "Curious what WPM means? WPM stands for Words Per Minute!"], 
    "5": ["kuf ruk kur ruf fur kurf kur ruk ku ||kku ffr ufk kruf furr rukk ffr ufk", ""], 
    "6": ["ruff furr ruff furr kruff furr ruff ||fur ruff kruff furr ruff fur ruf kr", ""], 
    "7": ["urkj jruk kurj jjkk urrkk jrku kurj ||kkrr uujj jurk kurj kurk jurj jurk", ""], 
    "8": ["rufkj jufr kjufrk jrkujk fjkur jufr ||fjkurk furfurfu krufkrfu furfurfu", ""], 
    "9": ["kurr kurrf kufr jjuu jjrr kfur jjuu ||kkjjuurrff furjkk uujjrrffkk jjufrk", ""], 
    "lesson": 2,
    "wpm": [0,0,0,0,0,0,0,0,0,0],
    "accuracy": [0,0,0,0,0,0,0,0,0,0]
  };

var lesson3 = {
    "0": ["ddd fff ddd fff dff dff ffd ffd ddf ||ddf ddf ddf ddf ffd ffd ffd ffd dfd", "New key: the letter D. While leaving your index finger on the F key, type the D key with your left hand's middle finger."], 
    "1": ["k iii k iii k iii k iii k iii k iii ||kii kii kii kii kii kii kik kik kik ||ikk iik kii kki ikk kii kki kik iki", "You will now be typing the I key by moving your middle finger up, then immediately moving it back down to its resting position on the K key. Make sure to only use your middle finger for this screen."], 
    "2": ["d eee d eee d eee d eee d eee d eee ||dee dee dee dee dee dee ded ded ded ||edd dde edd dde edd dde edd dde ede", "Use the middle finger on your left hand to type the E key."], 
    "3": ["ddd dee ddd dee ddd dee kki kki kki ||de ki de ki dde kki de ki ded kik ded", ""], 
    "4": ["jid kid rid eid jid kid rid eid ||kirk kird kirf kire kidr fied ||fur jir dek kid ed eir if udd", ""], 
    "5": ["jid kid rid eid jid kid rid eid did ||ed kirk did kik rid kid riff fied did", ""], 
    "6": ["rid rud ire rei rue ure red due ||die due dui ide irk kir kue uke ||fer feu fie fir fur ref rif die", ""], 
    "7": ["fed euk erk eik dif def kid ked ||iure urde rued rude ride ired ||dure dire kier kier kure kerf", ""], 
    "8": ["firk jure fike fuke jedi fuji ||rudie fried fired irked fired ||jeried juked duiker juried dire", ""], 
    "9": ["die due dui ide irk kir kue uke ||fed euk erk eik dif def kid ked ||fur jir dek kid ed eir if udd", ""], 
    "lesson": 3,
    "wpm": [0,0,0,0,0,0,0,0,0,0],
    "accuracy": [0,0,0,0,0,0,0,0,0,0]
  };

var lesson4 = { "lesson": 4
    , "0": ["d ccc d ccc d ccc d ccc d ccc d ccc ||ccc ddd ccc ddd ccc ddd ccc ddd ||ccd ccd ccd ddc ddc ddc ddc ccd ddc", "You are now going to learn the C key, which is your first time typing a Bottom Row letter. To type the C key, move your middle finger down from the D key, which it rests on when not typing. You may feel like using your ☞ index finger... Don't! Developing good habits and proper technique now will pay off later!"]
    , "1": ["j nnn j nnn j nnn j nnn j nnn j nnn ||nnn jjj nnn jjj nnn jjj nnn jjj jnj ||nnj nnj nnj jjn jjn jjn nnj nnj jjn", "Type the N key by moving your index finger down from the J key."]
    , "2": ["dcc jnn dcc jnn ccd nnj dcc jnn jdcn ||ncjd ncjd ncjd ncjd ncjd ncjd jdcn", ""]
    , "3": ["cnn cnn c n n ncc ncc n c c cnc ncn ||cnn cnn c n n ncc ncc n c c cnc ncn ||cnn cnn c n n ncc ncc n c c cnc ncn", ""]
    , "4": ["f ggg f ggg f ggg f ggg f ggg f ggg ||ggg fff ggg fff ggg fff ggg fff ggg ||ggf ggf ggf ffg ffg ffg ggf ggf ffg", "The G key is typed with your left hand's index finger. It simply moves over from the F key before moving back."]
    , "5": ["fgg jnn ggg nnn fnf jgj fgg jnn ||ggn nng fgfg jnjn ngng fgfg jnjn", ""]
    , "6": ["en in ne nu un ug id gu ||ig nie nid neg ned ide ||gue gin cid cud ecu ice ||dun end unde nied nide", ""]
    , "7": ["dun end unde nied nide ||genic dunce induce deduce ||cid cud ecu ice iced cine", ""]
    , "8": ["ig nie nid neg ned ide ||gue gin cid cud ecu ice ||genic dunce induce deduce", ""]
    , "9": ["duce duci iced cine ding ||dung gied gude guid nice ||dice nudge guide dinge ||genic dunce induce deduce", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson5 = { "lesson": 5
    , "0": ["f ttt f ttt f ttt f ttt f ttt f ttt ||ftt ftt ftt ftt ftt ftt ftf ftf ||ftt ftt ftt ftt ftt ftt tft tft tft", "Type the T key by reaching your index finger up from the F key. If this feels like a long stretch, you may need to elevate your wrists/palms off the keyboard. Keeping your wrists up is an important ergonomic technique, helping with both speed and injury prevention!"]
    , "1": ["k lll k lll k lll k lll k lll k lll ||kll kll kll kll kll kll klk klk klk ||kll kll kll kll kll kll lkl lkl lkl", "Time for a new finger! The L key is typed with the ring finger on your right hand."]
    , "2": ["f ttt f ttt ftt ftt ftf ftftft tft ||k lll k lll kll kll klk klk lkl lkl ||ft kl ft kl ft kl ft kl ltl tlt tlt", ""]
    , "3": ["d sss d sss d sss d sss d sss d sss ||dsss dss dss dss dss dss dsd dsd dsd ||dss dss dss dss dss dss sds sds sds", ""]
    , "4": ["es et is it li si st te ti us ||ut lie lis lit sei sel set sit ||sue sui tel tes tie til ties tui", ""]
    , "5": ["slug ties tile silt lute lets stile ||nicest signed tunic uncles genius", ""]
    , "6": ["linted signet single uited united ||luces cesti cutie glens glute guile", ""]
    , "7": ["nicest suited tunic stick trunk ||glens signet single suited united", ""]
    , "8": ["trucking clinkers stickler ||injured funkier rekt stick ||gifted gunk trunk uncleft", ""]
    , "9": ["luces cesti cutie glens glute guile ||injured funkier rekt stick ||nicest suited tunic stick trunk", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson6 = { "lesson": 6
    , "0": ["l ooo l ooo l ooo l ooo l ooo l ooo ||ooo lll ooo lll ooo lll lol lol lol ||ool ool ool llo llo llo olo olo olo", "Type the O key by reaching your ring finger up. Try not to laugh during this screen!"]
    , "1": ["f bbb f bbb f bbb f bbb f bbb f bbb ||fbb fbb fbb fbb fbb fbb fbb fbb fbb ||bbf bbf bbf bbf bbf bbf bbf bbf bbf", "Type the B key with your left hand's index finger. It's a bit of a stretch!"]
    , "2": ["loo fbb loo fbb ool bbf lo fbb flob ||bofl bofl bofl bofl bofl bofl flob", ""]
    , "3": ["obb obb o b b boo boo b o o obo bob ||bob obo o o b boo boo b b o obb boo", ""]
    , "4": ["s aaa s aaa s aaa s aaa s aaa s aaa ||aaa sss aaa sss aaa sss aaa sss aaa ||aas aas aas ssa ssa ssa aas aas ssa", "We are now moving to your final finger, the pinky! Type the A key with your left hand's pinky finger. Remember to leave all your other fingers resting on the Home Row at all times."]
    , "5": ["ob bo ba ab ba bo ob ||abo boa oba abo boa oba ||abo boa oba ab ba bo ob", ""]
    , "6": ["oat sal sat sol sot tao tas ||also alto alts last lats lost", ""]
    , "7": ["blast bolts sabot altos loast ||tolas salto loast botas boat", ""]
    , "8": ["boast boaked debark bakers ||laked raiked skated skitted", ""]
    , "9": ["abides adobes bailed bard ||coned conga dance design ||dingo genic incog ocean ||beading decagon coinage", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson7 = { "lesson": 7
    , "0": ["f vvv f vvv f vvv f vvv f vvv f vvv ||fvv fvv fvv fvv fvv fvv fvf fvf fvf ||vvf vvf vvf vvf vvf vvf vfv vfv vfv", "Type the V key with your left index finger."]
    , "1": ["j hhh j hhh j hhh j hhh j hhh j hhh ||jhh jhh jhh jhh jhh jhh jhh jhj jhj ||hhj hhj hhj hhj hhj hhj hhj hjh hjh", "Moving over to the right hand again, type the H key with your right index finger."]
    , "2": ["fv jh vf hj vvv hhh fvf jhj vvv hhh ||fv jh vf hj vvv hhh fvf jhj vvv hhh", ""]
    , "3": ["j mmm j mmm j mmm j mmm j mmm j mmm ||jmm jmm jmm jmm jmm jmm jmj jmj jmj ||mmj mmj mmj mmj mmj mmj mjm mjm mjm", "Type the M key with your right index finger."]
    , "4": ["jm jh jm jh jmjh jmjh hjm hjm mjh mjh ||hhh jjj mmm jjj hhh jjj mmm m h j m", ""]
    , "5": ["vhm vhm mvh mvh hmv hmv ||mmh mmv mmh mmv mmh mmv ||vvh vvm hhv mmh vhm vmv", "While typing, try using quick strokes. Hit the keys and bounce off. Don't hold down or smash the keys. Just stroke, and bounce your finger back up."]
    , "6": ["ab ah am ba bo ha hm ma mo ||oh om avo bah bam boa ham ||hao hob mho moa moba moha", ""]
    , "7": ["hams hang hant hats hobs hogs ||holt host mobs most moth mogs ||oval vang vans vast vats volt", ""]
    , "8": ["moth mogs oval vang vans vast vats ||hacks halos halfts haulm havoc hacks ||formal fourth frocks frugal fulgor ||turban rubos tuscan umbtsl unv volt", ""]
    , "9": ["haol hacks formal ovals halo hacks ||halo hacks formal ovals halo hacks", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson8 = { "lesson": 8
    , "0": ["k ,,, k ,,, k ,,, k ,,, k ,,, k ,,, ||k,, k,, k,, k,, k,, k,, k,k k,k k,k ||,,k ,,k ,,k ,,k ,,k ,,k ,k, ,k, ,k,", "Type the , (comma) key with your right middle finger. This can feel really awkward, but it will become natural as you practice. Remember to always bring your finger back to the K key."]
    , "1": ["l ... l ... l ... l ... l ... l ... ||l.. l.. l.. l.. l.. l.. l.l l.l l.l ||..l ..l ..l ..l ..l ..l .l. .l. .l.", "The . (period) key is typed with your right hand's ring finger."]
    , "2": ["l. k, l,, ..l ,,k .l ,k ,, .. ,. ,. ||look. kool. ... ,,, kool. look. ... ,,,", ""]
    , "3": ["j. k. l. u. i. o. m. n. h. g. ||f, d, s, a, t, r, e, b, v, c,", ""]
    , "4": ["job. ham. hob. jab, jam, mob, ohm. ova,", ""]
    , "5": ["foam. jamb, lamb. lash, last. lath,", ""]
    , "6": ["farm, faro, foam, fork, form, ||harm. hoar. hour. jamb. jour.", ""]
    , "7": ["ovum, raku, roam, abhor, abohm, ||soar, sofa. soft, soma. sorb.", ""]
    , "8": ["stab, star. stoa, stub. sulk, surf. ||taco, taro. task, thou. thru, tofu, ", ""]
    , "9": ["harm. hoar. stoa, stub. taro. task, ||raku, roam, last. lath, ovum, raku,", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson9 = { "lesson": 9
    , "0": ["s www s www s www s www s www s www ||sww sww sww sww sww sww sww sws sws ||wws wws wws wws wws wws wws wsw wsw", "Type the W key with your left hand's ring finger. Don't forget to bring it back to the S key!"]
    , "1": ["l ;;; l ;;; l ;;;; l ;;; l ;;; l ;;; ||l;; l;; l;; l;; l;; l;; l;; l;l l;l ||;;l ;;l ;;l ;;l ;;l ;;l ;;l ;l; ;l;", "Now for the final finger, type the ; (semicolon) key with your right hand's pinky. After this screen, you will have used all 10 fingers!"]
    , "2": ["sww l;;; sww l;; s www s www l ;;; l ;; ||wss ;ll wss ;ll wsw wsw ;l; ;l; sws sws", ""]
    , "3": ["s xxx s xxx s xxx s xxx s xxx s xxx ||sxx sxx sxx sxx sxx sxx sxx sxs sxs ||xxs xxs xxs xxs xxs xxs xxs xsx xsx", "Type the X key by bringing your left hand's ring finger down, and then returning to the S key."]
    , "4": ["sxs sws sxs sws wsx wsx xsw xsw ||xxxx wwww xx ww sw sx sw sx wxw", ""]
    , "5": ["www xxx ;;; wx; ;xw wwx ww; sx sw l; ;l ||;w ;x ;;w ;;x x;x s;s w;w wxw xwx ww;", ""]
    , "6": ["hex how; ho; maw maxx; mew; owe vaw;", ""]
    , "7": ["avow; exam; meow; view; voix; wave;", ""]
    , "8": ["wham; what; wheat whet wax; tax; vew;", ""]
    , "9": ["texan. toxic; toxin, twain; vixen;", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson10 = { "lesson": 10
    , "0": ["a qqq a qqq a qqq a qqq a qqq a qqq ||aqq aqq aqq aqq aqq aqq aqa aqa aqa ||aaq aaq aaq aaq aaq aaq qaq qaq qaq", "Type the Q key with your left hand's pinky."]
    , "1": ["j yyy j yyy j yyy j yyy j yyy j yyy ||jyy jyy jyy jyy jyy jyy jyj jyj jyj ||jjy jjy jjy jjy jjy jjy yjy yjy yjy", "Type the Y key by bringing your right hand's index finger up."]
    , "2": ["aqqq jyyy aqqq jyyy a qqq j yyy aqq ||qqqa yyyj qqqa yyyj qqq yyy qqq yyy", ""]
    , "3": ["; ppp ; ppp ; ppp ; ppp ; ppp ; ppp ||;pp ;pp ;pp ;pp ;pp ;pp ;p; ;p; ;p; ||pp; pp; pp; pp; pp; pp; p;p p;p p;p", "Type the P key with your right hand's pinky. This might be a tough one, but with practice you won't even think about it!"]
    , "4": ["a zzz a zzz a zzz a zzz a zzz a zzz ||azz azz azz azz azz azz aza aza aza ||zza zza zza zza zza zza zza zaz zaz", "The last letter of the keyboard! Type the Z key by bringing your left hand's pinky down from the A key."]
    , "5": ["zap zep zip quiz ||zap zep zip quiz", ""]
    , "6": ["raze rez ritz ritzy terza za zaz ritz", ""]
    , "7": ["za zeta zero zit zoa zozzy", ""]
    , "8": ["wimmy wam wam wozzle ||wimmy wam wam wozzle ||wimmy wam wam wozzle ||wimmy wam wam wozzle", ""]
    , "9": ["look at that, you are a great typist ||you can now type anything. ||you deserve an award.", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson11 = {
  "0": ["the of to and a in is it you that he", ""],
  "1": ["are with as i his they be at one have", ""],
  "2": ["or had by hot but some what there we", ""],
  "3": ["other were all your when up use word", ""],
  "4": ["each she which do their time if will", ""],
  "5": ["many then them would write like so this", ""],
  "6": ["make thing see him two has look more", ""],
  "7": ["come did my sound no most number who", ""],
  "8": ["water than call first people may down", ""],
  "9": ["now find any new work part take get play", ""],
  "lesson": 11,
  "wpm": [0,0,0,0,0,0,0,0,0,0],
  "accuracy": [0,0,0,0,0,0,0,0,0,0]
};
var lesson12 = {
  "0": ["live where after back little only round", ""],
  "1": ["came show every good me give our under", ""],
  "2": ["through just form much great think say", ""],
  "3": ["line before turn cause same mean differ", ""],
  "4": ["boy old too does tell sentence set tree", ""],
  "5": ["well also play small end put home read", ""],
  "6": ["large spell add even land here must big", ""],
  "7": ["need house picutre try us again animal", ""],
  "8": ["mother world near build self earth", ""],
  "9": ["Good job on making it this far. ||Give yourself a pat on the back.", ""],
  "lesson": 12,
  "wpm": [0,0,0,0,0,0,0,0,0,0],
  "accuracy": [0,0,0,0,0,0,0,0,0,0]
};
var lesson13 = { "lesson": 13
    , "0": ["add all alley aft agh ask afford ajar ||ate art app arty awe aww apt arr aught ||abs acct among aztec ant am avenue", ""]
    , "1": ["salad slap slide shell sad sat shall ||super sure sip sod side sewer sell sap ||sam sack salmon sniper snack snoop", ""]
    , "2": ["dad dan decide dag darpa dart defer ||dip destiny dread dew do dipity dud ||dax dimmer dinner dav dam dax dent doom", ""]
    , "3": ["fan flirt fact flute flapper ||fill fed fun few fewer fist fern ||fanatic fancy fab fennel fervor", ""]
    , "4": ["gandalf garden gas gad gallant gap ||great goo good gin guard garden green ||gamma gammy gym gabby gib gone gaven", ""]
    , "5": ["has hat half haha ham halpert handy ||helmet hep hurting hip heart hem hurt ||hand hammy hen hummer hunger hack hax", ""]
    , "6": ["jason jam jan jail jandy jag jandy ||jest jen jill john joyous jimmy joomla ||jam jabber jamming jax javvy jammers", ""]
    , "7": ["kayak kernite keystroke kiddy ||key kitten kelp keyboard king kite ||knot karma knife knee kemp kick", ""]
    , "8": ["lamb ldybug last lamp lad laugh ||leaf loollipop lips log lion lemon ||lack lamb lam lob labs lid", ""]
    , "9": ["How much wood could a woodchuck ||chuck, if a wookchuck could chuck wood", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson14 = { "lesson": 14
    , "0": ["quartz quail quart quiver queen ||quilt quit quack quell qua ||quadev quest quint quaint quab", ""]
    , "1": ["wonder were wet weapon weeds window ||wheat when where whack wander waft wall ||want waver wacky wax wave went worn", ""]
    , "2": ["eerie eep eight eyes eel ewe eeple ||egg elk eagle ear earth eleven earn ||evil evangelical even evan extra", ""]
    , "3": ["rose ring robot record report ruse re ||rabbit rain rainbow rake rat rhino ||ram rave recede rummy razzle rabbit", ""]
    , "4": ["tent tiger toe toilet toad tooth toil ||taxi table tasty tally tattle tail ||tan tammy tax taxed tacky tabby", ""]
    , "5": ["yell yolk yogurt yoyo yelling yippy ||yacht yarn yawn yak yam yag yaffer ||yaz yax yabby yuma young yummy yamax", ""]
    , "6": ["up upside ur uppity upperson underwhelm ||usa unicycle understand upstairs ||umbrella unicorn unhappy uniform uni", ""]
    , "7": ["iris irate import idaho iconic icon ||iquana igloo idea island indigo ilene ||ice ivy icicle inside important intuit", ""]
    , "8": ["orange owl orly ornate orchard ore ||oar odd off offer offering oatmeal ||ox one oboe oval onto ovate only ox", ""]
    , "9": ["portly pin pure pods privy pencil pig ||paint pants pal pail plane plain pan ||pam pizza pizzas pavel", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson15 = { "lesson": 15
    , "0": ["xenops xiphias xerox xenon xerxes ||xavier xaks xader xalmo xaghij xalfo ||xan xemop xenox xemnob xazer xab xzv", ""]
    , "1": ["cow corn cone crony code cola coal ||car camel cake cat carp cart card ||cab cabby cammie candy carny cennel", ""]
    , "2": ["vest volcano vote violin vowels ||vacuum vat van valley velvet ||vagrant vale vase vasiform", ""]
    , "3": ["bee bird broom bus butterfly booths ||bat balloon bag banana ball ballroom ||bavarian banned banner bammy bax", ""]
    , "4": ["net nose nest notes nine number ||nail nair navel nan nap nah nal ||navigation navizon nam nab nax", ""]
    , "5": ["milk mouse mitten moth mop moon moons ||man mask mail mable maple man male mail ||monday montel mack mabby maze maps", ""]
    , "6": ["wither wist wisdom forth from fields ||foam nay narry neighbor ear the quail ||evermore evermore happy handle", ""]
    , "7": ["tess teassed tom tomorrow today too ||hungery hamburgers helped helpers help ||broken badges banged bells", ""]
    , "8": ["myles mills miles might morrow maybe ||random raves ravenged red rhinos ||phones filled philly phat friday", ""]
    , "9": ["accidents happen happily advently ||utah ute ukulele umbras umbra umbrella ||canopy capriciously caroled capricorns", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson16 = { "lesson": 16
    , "0": ["Jjjj Jjjj Jjjj Jjjj Ffff Ffff Ffff ||jJj jJj jJj jJj jJj fFf fFf fFf fFf", ""]
    , "1": ["jJ fF jJ fF kK dD kK dD lL sS hH gG aA ||Jj Ff Jj Ff Kk Dd Kk Dd Ll Ss Hh Gg Aa", ""]
    , "2": ["uU rR uU rR iI eE iI eE oO wW oO wW pP ||Uu Rr Uu Rr Ii Ee Ii Ee Oo Ww Oo Ww Pp", ""]
    , "3": ["mM vV mM vV cC nN cC nN xX Bb xX bB zZ ||Mm Vv Mm Vv Cc Nn Cc Nn Xx Bb Xx Bb Zz", ""]
    , "4": ["The Be To Of And A In That Have I It", ""]
    , "5": ["On With He As You Do At This But His By", ""]
    , "6": ["Would would There there What what In in", ""]
    , "7": ["They are tall. It is great. ||They are tall. It is great. ||They are tall. It is great. ||They are tall. It is great.", ""]
    , "8": ["Oh what a world where Waldo ||wanders willingly willy nilly. ||Neither here, neither there. ||Wherefore art thou Waldo", ""]
    , "9": ["Respite requires requiem ||Recreation requests creation", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson17 = { "lesson": 17
    , "0": ["Whatever you are, be a good one.", ""]
    , "1": ["Be the change you wish ||to see in the world.", ""]
    , "2": ["Try and fail, but never fail to try.", ""]
    , "3": ["Do one thing every day that scares you.", ""]
    , "4": ["Believe you can and you ||are halfway there.", ""]
    , "5": ["Let your memory be your travel bag.", ""]
    , "6": ["To travel is to take a ||journey into yourself.", ""]
    , "7": ["I have not been everywhere, ||but it is on my list", ""]
    , "8": ["If you come to a fork in the ||road, take it.", ""]
    , "9": ["April has put a spirit of ||youth in everything.", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson18 = { "lesson": 18
    , "0": ["; ''' ; ''' ; ''' ; ''' ; ''' ; ''' ||''' ;;; '' ;;; ''' ;;; ;'; ;'; ;'; ||''; ''; ''; ;;' ;;' ;;' ';' ';' ';'", ""]
    , "1": ["won't can't ain't he's he'd it's ||isn't she'd let's", ""]
    , "2": ["; /// ; /// ; /// ; /// ; /// ; /// ||/// ;;; /// ;;; /// ;;; ;/; ;/; ;/; ||//; //; //; ;;/ ;;/ ;;/ /;/ /;/ /;/", ""]
    , "3": ["he/she them/us yes/no ||up/down loud/quiet a/b", ""]
    , "4": ["won't/will can't/can ||didn't/did aren't/are", ""]
    , "5": ["isn't typing with apostrophes great ||before this exercise you couldn't", ""]
    , "6": ["did you know that you can type faster ||practice everyday, you'll see", ""]
    , "7": ["it's fun to type when on your pc/mac ||many boys/girls have found that's true", ""]
    , "8": ["What do you think about touch typing ||I'm pretty sure it's an awesome skill", ""]
    , "9": ["She hasn't ran, or she'd be very tired. ||She's got a long run ahead of her ||but you'll see she's going to do great.", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson19 = { "lesson": 19
    , "0": ["Tracy looked at the flag. The flag is ||red, white, and blue. It has fifty ||white stars, seven red stripes, and ||six white stripes.", ""]
    , "1": ["Donald plays the piano. He loves the ||piano. He has a big piano in his ||living room. His piano is shiny ||and black.", ""]
    , "2": ["This weekend I went to the zoo. It was ||great. I went with my mom and dad. ||My sister came, too. The zoo was in ||the city. The drive was very long.", ""]
    , "3": ["When I was playing today at recess, I ||felt like a kite blown around by the ||wind. It was hard to stay in one ||place because the wind was so strong.", ""]
    , "4": ["My teacher is awesome. I think she ||deserves an award for teaching. I ||have liked all my teachers, but she ||is by far the best I've ever had.", ""]
    , "5": ["I think apples are great. They are ||a fun fruit to eat. Apples come in ||many colors, but my favorite is green.", ""]
    , "6": ["The violin is an instrument with ||strings. It can be played loud and ||quiet. The violin is often played ||with other instruments like the cello.", ""]
    , "7": ["Be sure to take breaks when you need ||them. Typing for too long can have ||negative effects. Also, drink water.", ""]
    , "8": ["Typing is a great skill to have. It is ||useful in  a myriad number of ||circumstances.", ""]
    , "9": ["Last thing, don't forget to take your ||focus off the screen for a bit. ||Staring a screen for too long can hurt ||your eyes.", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};
var lesson20 = { "lesson": 20
    , "0": ["a aq aqa qaq j ju juj uju just aqua ||toughs sequence thoughtless staunch ||summer pounce afoul differentiated hair", ""]
    , "1": ["uncap funoff liquid sunned monitored ||scudded unlearn fugitive furnace fur ||roguish illumined rectangular fort ||mournful teaspoon laughable quest", ""]
    , "2": ["curve queen haiku quit unsupportable ||bullfrogs mutated tunes outfit trump ||constructional recurring incongruous ||populations minute cruelties function", ""]
    , "3": ["s sw sws wsw j jn jnj njn west nju nut ||buttress ivisible malaria sand bagged ||irresistible cling within passionate ||tangible place trilingual misconstrue", ""]
    , "4": ["beechwood numberal universal canon ||mockingbirds predation vote master ||nice aggregation enter wide congregate ||weakened gravitation intact speak paper", ""]
    , "5": ["toughness wrench alliteration squawk ||flat counter invent ordain adverse ||paternal council sugarcanee resemble ||subsequent equidistant swifter shrewd", ""]
    , "6": ["cd dc dcd cdc s sd s sx sxs xsx crux ||retrench panache fractious compressor ||scrawniest scour thunder clouds unpack ||selects function concoct contentious", ""]
    , "7": ["stock coarse execution commercial clam ||crave muck correct subscripts escape ||livestock scuba cares concordant fun ||hatch charge civil exclusionn biscuit", ""]
    , "8": ["choir decrement witchcraft perception ||instruct consent evacuate efficient ||prancing stack teacup saccharides ||beseech acres counted backlash commence", ""]
    , "9": ["commentate disciple inclusive ||cleanliness priceless impractical ||muscles projects beckoning compliment ||parachute cowardice contour stereoscope", ""]
    , "wpm": [0,0,0,0,0,0,0,0,0,0]
    , "accuracy": [0,0,0,0,0,0,0,0,0,0]};





/************************************
 * Set the current lesson to orange
 *************************************/
function highlightLesson(lesson) {

    var lessonName = "lesson" + lesson;

    if (lessonNumber) {
        var oldLesson  = "lesson" + lessonNumber;
        document.getElementById(oldLesson).style.backgroundColor  = "" // Reset
    }

    document.getElementById(lessonName).style.backgroundColor  = "#ff751a" // Set to orange

} 

/**********************************************************
 * Reset the page
 *********************************************************/
function reset() {

    seconds        = 0;
    correctLetters = 0;
    start          = false;
    lessonEnd      = false;
    justEnded     = false;
    timeStamp = null;
    

    // Repeated code 
    // Later create a seperate function for this
    for (var i = 0; i <= currentLetter; i++) {
        // Reset the color and id of each span
        spans[currentLetter].id = "";
        spans[i].style.backgroundColor = "";     // Set to grey

        if(i == 0) {
            spans[currentLetter].id = "current";
            spans[i].style.backgroundColor = "#66a3ff"; // Set to blue
        }
    }

    currentLetter = 0;

    // Reset the focus onto the lesson
    document.getElementById("reset").blur();

}

/**********************************************************
 * That's pretty self explanitory...
 * I took this out of the final submission, but it would be 
 * simple to re-add.
 *********************************************************/
function updateTimer() {

    // Add a 5 minute cap
    if (seconds <= 300 && !lessonEnd) {

        // Format the seconds into a time stamp
        if (seconds % 60 < 10)
            timeStamp = Math.floor(seconds / 60) + ":0" + (seconds % 60);
        else 
            timeStamp = Math.floor(seconds / 60) + ":" + (seconds % 60);

        if(start == true)
            seconds++;
    }
}



/**********************************************************
* Get the selected lesson ready to start
***********************************************************/
function loadLesson(lesson, part) {

    // If it's the last part of a lesson go to the next lesson
    if (part == 10) {
        part = 0;
        lesson++
    }

    // This is not what I want to happen, just for the record
    if (lesson == 21) {
        lesson = 1;
    }



    lessonNumber = lesson;
    lessonPart   = part;
    var tmp1     = null;


    
    if(letters.length > 0) {
        var someLetter = letters[currentLetter].toLowerCase();


        tmp1 = document.getElementById(someLetter).className;
        document.getElementById(someLetter).className = tmp1.replace("active", "disabled");

        console.log(someLetter);
    }

    //If another lesson has been started, reset
    if(start == true ||lessonEnd == true) {
        reset();
    }

    var filename = "lesson" + lesson;

    currentLesson = eval(filename);

    // Loop through the lesson and split it into multiple divs.
    // Send the divs to the document
    

    // Parsed text with html
    lessonContent = currentLesson[part][0].split('||');

    // Original letters
    letters = lessonContent.join('');



    // Fill the progress bar correctly
    for (var i = 0; i < 10; i++) {

        var partName = "part" + i;
        document.getElementById(partName).style.backgroundColor = ""; // Set to grey

        if (currentLesson.wpm[i] != 0) 
            document.getElementById(partName).style.backgroundColor = "#28a745";
    }

    // Set the current lesson part to orange
    document.getElementById("part" + part).style.backgroundColor = "#ff751a";

    // Make sure the progress bar is now visible
    document.getElementById("lessonProgress").style.visibility = "visible";


    // Show which lessons are done
    for (var i = 1; i <= 20; i++) {

        document.getElementById("lesson" + i).style.backgroundColor = ""; // Set to grey

        // TODO - Change everything to be index based
        if (userInfo.lessons[i - 1] == true) 
            document.getElementById("lesson" + i).style.backgroundColor = "#28a745";
    }

    // Set the current lesson to orange 
    highlightLesson(lesson);


    // For each line
    for (var i = 0; i < lessonContent.length; i++) {
        
        // Initialize and reset letter spans 
        var letterSpans = "";

        // Put each letter in a span tab and write it to the document
        for (var j = 0; j < lessonContent[i].length; j++)
            if(!(j == 0 && i == 0))
                letterSpans += "<span class=\"letter\">" + lessonContent[i][j] + "</span>";
            else if(j == 0 && i == 0)
                letterSpans += "<span class=\"letter\" id=\"current\" style=\"background-color: #66a3ff;\">" + lessonContent[i][j] + "</span>";

        // Create a div for that line
        lessonContent[i] = "<div class=\"row\" id=\"row" + i + "\">" + letterSpans + "</div>";
    }

    // Make the first letter in the lesson active on the keyboard
    if(letters.length > 0) {
        var lowerLetter = letters[0].toLowerCase();        

        tmp1 = document.getElementById(lowerLetter).className;
        document.getElementById(lowerLetter).className = tmp1.replace("disabled", "active");
    }

    document.getElementById("tip").innerHTML = currentLesson[part][1];

    document.getElementById("lessonInput").innerHTML = "";

    for (var i = 0; i < lessonContent.length; i++)
        document.getElementById("lessonInput").innerHTML += lessonContent[i]; 

    spans = document.getElementsByClassName("letter");
}

/**********************************************************
 * Change which keys are highlighted on the keyboard.
 * There are more effectient ways of doing this. I coded
 * it to be easily understood.
 *********************************************************/
function changeKeys(forward) {

    var letterIndex;

    if (forward) {
        //letterIndex = currentLetter - 1;

        //Deactivate the last letter
        var someLetter = letters[currentLetter - 1].toLowerCase();
        var tmp1 = document.getElementById(someLetter).className;
        document.getElementById(someLetter).className = tmp1.replace("active", "disabled");

        // Activate the current letter
        var someLetter2 = letters[currentLetter].toLowerCase();
        var tmp2 = document.getElementById(someLetter2).className;
        document.getElementById(someLetter2).className = tmp2.replace("disabled", "active");


    }
    else {
    
        // Deactivate the current letter
        var someLetter = letters[currentLetter].toLowerCase();
        var tmp1 = document.getElementById(someLetter).className;
        document.getElementById(someLetter).className = tmp1.replace("active", "disabled");

        //Activate the previous letter if currentLetter is greater than 0
        if(currentLetter > 0) {
            var someLetter2 = letters[currentLetter - 1].toLowerCase();
            var tmp2 = document.getElementById(someLetter2).className;
            document.getElementById(someLetter2).className = tmp2.replace("disabled", "active");
        }
    }
}

/**********************************************************
 * 
 *********************************************************/
function moveForward(isCorrect) {

    if(isCorrect) {
        correctLetters++;
        spans[currentLetter].id = "correct";
        spans[currentLetter].style.backgroundColor = "#5cd65c"; // Set to green
    } 
    else {
        spans[currentLetter].id = "wrong";
        spans[currentLetter].style.backgroundColor = "#ff6666"; // Set to red
    }

    currentLetter++;

    if(currentLetter == letters.length) {
        justEnded = lessonEnd = true;
        currentLetter--;
    }
    else {
        spans[currentLetter].id = "current";
        spans[currentLetter].style.backgroundColor = "#66a3ff"; // Set to blue  

        if(start == false)
            start = true;

        changeKeys(true);
    }
}


/**********************************************************
 * Handle key strokes appropriatly
 *********************************************************/
document.addEventListener('keydown', function(event) {

    // Disable the enter key and tab keys
    if (event.keyCode == 9 ||event.keyCode == 11 ||event.keyCode == 13 ||event.keyCode == 8)
        event.preventDefault();

    //console.log(event.keyCode);

    // Check if the lesson is over. Enter starts the next lesson
    if (event.keyCode == 13 && lessonEnd) {
        loadLesson(lessonNumber, lessonPart + 1);
        $("#myModal").modal("hide");

    }

    // Only do this if the lesson isn't over
    if(!lessonEnd) {

        if (letters[currentLetter] == event.key) {
            moveForward(true); // Correct Key was pressed
        } 
        else if ( ((32 <= event.keyCode && event.keyCode < 127) ||event.keyCode == 186) && start == true) {
            moveForward(false); // Incorrect Key was pressed
        } 
        else if (event.keyCode == 8 && currentLetter > 0) {
            
            spans[currentLetter].id = "";
            spans[currentLetter].style.backgroundColor = ""; // Set to grey
            
            if (spans[currentLetter - 1].id == "correct") 
                correctLetters--;
            

            changeKeys(false);
            currentLetter--;


            spans[currentLetter].id = "current";
            spans[currentLetter].style.backgroundColor = "#66a3ff";     // Set to blue
        }
    }
    
    if (lessonEnd && justEnded){


        justEnded = false;


        var accuracy = Math.floor((correctLetters / letters.length) * 100);
        var wpm      =  Math.floor((letters.length / 5.1) / (seconds / 60));


        currentLesson.accuracy[lessonPart] = accuracy;
        currentLesson.wpm[lessonPart] = wpm;

        
        // Update the modal with the correct info about the lesson
        document.getElementById("wpm").innerHTML = wpm + "wpm";
        document.getElementById("accuracy").innerHTML = accuracy + "%";
        document.getElementById("time").innerHTML = timeStamp;

        $("#myModal").modal({show: true});  

    

        var updateLessons = true;

        for (var i = 0; i < 10; i++) {
            if (currentLesson.accuracy[i] == 0) {
                updateLessons = false;
                break;
            }
        }
    
        // If the lesson was finished, update the lessons in userInfo
        if(updateLessons) { userInfo.lessons[lessonNumber - 1] = true; }

        // Update the accuracy
        // Later use a better strategy
        if (userInfo.accuracy > 0)
            userInfo.accuracy = Math.floor((userInfo.accuracy + currentLesson.accuracy[lessonPart])) / 2;
        else 
            userInfo.accuracy = Math.floor(currentLesson.accuracy[lessonPart]);

        // Update the wpm
        if (userInfo.wpm > 0)
            userInfo.wpm = Math.floor((userInfo.wpm + currentLesson.wpm[lessonPart])) / 2;
        else 
            userInfo.wpm = Math.floor(currentLesson.wpm[lessonPart]);

    }
}

);
