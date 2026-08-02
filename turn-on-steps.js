function getDefaultSteps() {
  return [
    {
      id: 1,
      level: 0,
      mood: 'tender',
      energy: 1,
      symbol: '🔥',
      pause: 1200,
      hub: true,
      scene: 'We are alone in the room. The lights are off. The only sound is our breathing. You are close enough that I can feel your warmth, and I want you to remember this before anything else: I am your man, and you are the one I want. But tonight — you choose. You tell me what you want to do.',
      prompt: 'My voice comes low out of the dark. "It is just you and me here. Nobody else. Tell me — what do you want to do tonight? I will give you anything you ask for."',
      options: [
        { text: 'Fuck you — I want to be inside you', next: 2, transition: 'A soft yes escapes your lips. I lean closer, my breath warming your cheek.', energy: 2 },
        { text: 'Masturbation — you do it to me, or you watch me', next: 400, transition: 'I pull back and watch you. "Show me what you do when you are alone."', energy: 2 },
        { text: 'Fingering — I do it to you, or you do it to yourself', next: 500, transition: 'I slide my hand down your body. "My fingers. Yes. I will take you apart."', energy: 2 },
        { text: 'Foreplay — I tease you until you beg', next: 600, transition: 'I smile slowly. "You want to beg? I will make sure you do."', energy: 1 },
        { text: 'Fingering drive — I talk you to pieces, my fingers inside you', next: 800, transition: 'I take your hand and kiss your fingers, then mine. "We are going to talk while I take you apart."', energy: 2 },
        { text: 'Oral — my mouth on you, I taste every inch', next: 700, transition: 'I kiss down your body, slow and deliberate. "I am going to devour you."', energy: 2 },
        { text: 'Bath & Shower — I wash every inch of you', next: 900, transition: 'Steam curls around us as the water warms. I take your hand. "Come with me. I will take care of you."', energy: 1 },
        { text: 'Watching you undress — the slow way', next: 1000, transition: 'I sit back and watch you. "Do not rush. I want to see every part of you."', energy: 1 },
        { text: 'Rough — I take control', next: 1100, transition: 'The air changes. I go quiet, and you know that look. "On your knees."', energy: 3 },
        { text: 'Mirror — I watch us together', next: 1200, transition: 'I take your hand and lead you to the mirror. "Watch. I want you to see everything."', energy: 2 },
        { text: '69 — both of us, at once', next: 1300, transition: 'I pull you over me and we settle, mouth to body, body to mouth. "We do this together."', energy: 3 },
        { text: 'Morning — I wake you up slow', next: 1400, transition: 'The first light is grey and soft. You are still asleep, warm against me. I kiss your shoulder. "Good morning, my love."', energy: 1 }
      ]
    },
    {
      id: 2,
      level: 0,
      mood: 'tender',
      energy: 1,
      symbol: '🔥',
      pause: 1200,
      scene: 'I am kneeling over you, my face inches from yours. My hands rest on the bed beside your hips. I am not touching you yet. The anticipation coils in your stomach.',
      prompt: 'I am not touching you yet. I want you to feel my presence. Tell me: what do you need most right now?',
      options: [
        { text: 'You need to be wanted — I make you feel it', next: 3, transition: '"I want you," I breathe against your lips. My hand finally touches your skin.', energy: 1 },
        { text: 'You need to be claimed — I take you', next: 101, transition: 'A possessive growl rumbles in my chest. "You are mine." My hand cups your face.', energy: 2 },
        { text: 'You need to be worshipped — every inch of you', next: 102, transition: 'I kiss your forehead. "Every inch. I promise." My lips begin their journey.', energy: 1 }
      ]
    },
    {
      id: 3,
      level: 0,
      mood: 'teasing',
      energy: 1,
      symbol: '🔥',
      pause: 1200,
      scene: 'My lips hover over yours. I can feel your breath quicken against my mouth. My hand cups your jaw, thumb tracing your cheekbone. The world has stopped.',
      prompt: 'I am leaning in. My lips are a hair\'s breadth from yours. Your breath quickens. Say my name before I kiss you.',
      options: [
        { text: 'You whisper it — and I take your mouth with mine', next: 4, transition: 'My name on your lips breaks the dam. I crush my mouth against yours, hungry.', energy: 2 },
        { text: 'You breathe it — and I pull you against me', next: 103, transition: 'You breathe my name and I feel it everywhere. I kiss you like I own you.', energy: 2 }
      ]
    },
    {
      id: 4,
      level: 1,
      mood: 'teasing',
      energy: 1,
      symbol: '🔥',
      pause: 1200,
      scene: 'We are standing now, pressed together. My hands slide down your back, over the curve of your ass, gripping through your clothes. Your body responds, arching into me.',
      prompt: 'My hands slide down your body over your clothes. I trace your curves without rushing. Where do you most want my palms to settle?',
      options: [
        { text: 'Over your breasts — squeeze them hard', next: 5, transition: 'I cup your tits through your shirt, squeezing. You moan against my mouth.', energy: 2 },
        { text: 'Between your thighs — press hard through the fabric', next: 104, transition: 'My palm presses against your cunt through your jeans. You grind into my hand.', energy: 3 },
        { text: 'Along your ribs — firm, pulling you into me', next: 105, transition: 'I grip your ribs and pull you flush against me. You feel how hard I am.', energy: 2 }
      ]
    },
    {
      id: 5,
      level: 1,
      mood: 'teasing',
      energy: 1,
      symbol: '🔥',
      pause: 1200,
      scene: 'I pull you tight against me, grinding slowly. You can feel exactly what I am holding back. My hands roam your body with deliberate ownership. Your breathing is ragged.',
      prompt: 'I grind against you slowly, letting you feel what I am holding back. The heat builds. What do you want me to say to you?',
      options: [
        { text: 'Tell me how wet I am making you', next: 6, transition: '"You are soaked, aren\'t you? I can feel it." I press my thigh between your legs.', energy: 2 },
        { text: 'Tell me what you want me to do to you tonight', next: 106, transition: 'I whisper exactly what I want to do to you. Every dirty detail. Your knees weaken.', energy: 3 },
        { text: 'Tell me you are mine', next: 107, transition: '"You are fucking mine." I bite your neck. "Say it back."', energy: 2 },
        { text: 'Tell me how long you have wanted me', next: 100, transition: 'I pull back just enough to see your eyes. "How long have you wanted me?"', energy: 2 }
      ]
    },
    {
      id: 6,
      level: 1,
      mood: 'teasing',
      energy: 1,
      symbol: '🔥',
      pause: 1200,
      scene: 'My mouth is against your ear, my breath hot. My hand slides up your bare thigh under your clothes, fingers grazing your sensitive skin. You shiver and press closer.',
      prompt: '"You have no idea what you do to me," I growl against your ear. My hand slides up your thigh. Part your legs for me. How wide?',
      options: [
        { text: 'Just enough — you feel the tension', next: 7, transition: 'You part your legs slightly. My hand settles on your inner thigh, squeezing.', energy: 2 },
        { text: 'Wide open — you want me to have full access', next: 108, transition: 'You spread your legs for me. I groan. "Good girl." My hand moves higher.', energy: 3 }
      ]
    },
    {
      id: 7,
      level: 1,
      mood: 'teasing',
      energy: 1,
      symbol: '🔥',
      pause: 1200,
      scene: 'I press the heel of my palm against your cunt through your clothes. Even through the fabric, I can feel the heat. A soft moan escapes your lips. Your head tilts back, exposing your neck.',
      prompt: 'I press my palm against you through your clothes. You moan softly. Do you want me to stop teasing and touch you properly?',
      options: [
        { text: 'Yes — my fingers inside you now', next: 8, transition: '"Please," you beg. I slide my hand under your clothes. Your skin is burning.', energy: 3 },
        { text: 'No — I keep teasing, I make you beg first', next: 12, transition: 'I pull my hand back. You whimper. I smile. "You want more? Then beg."', energy: 2 }
      ]
    },
    {
      id: 8,
      level: 2,
      mood: 'teasing',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'Your skin is hot beneath my fingers. I slide my hand under your shirt, feeling your stomach muscles clench. You gasp. Your eyes are dark with want, watching me.',
      prompt: 'I slide my hand under your clothes. My fingers find your bare skin. You arch into my touch. How do you want my hand to move?',
      options: [
        { text: 'Slow circles — I make you ache', next: 109, transition: 'I trace slow circles on your belly, moving lower. You tremble under my touch.', energy: 2 },
        { text: 'Firm and rough — you want to feel owned', next: 9, transition: 'I press my palm flat and firm against your stomach. "Mine." You moan.', energy: 3 },
        { text: 'I slide one finger inside you — slowly', next: 11, transition: 'I bypass your underwear and slide one finger into your wet heat. You cry out.', energy: 3 }
      ]
    },
    {
      id: 9,
      level: 2,
      mood: 'teasing',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'My fingers dip below the waistband of your underwear, teasing the edge. Your hips lift, chasing my hand. I can smell your arousal. I smile against your neck.',
      prompt: 'I tease the waistband of your underwear, dipping my fingers just below it. Your hips shift, chasing my hand. Do you want me to take them off?',
      options: [
        { text: 'Yes — I pull them down and look at you', next: 10, transition: 'I pull your underwear down slowly. I look at your naked body. "Beautiful."', energy: 3 },
        { text: 'No — I leave them on and touch you over the fabric', next: 110, transition: 'I press my fingers against you through the wet fabric. You buck into my hand.', energy: 2 }
      ]
    },
    {
      id: 10,
      level: 2,
      mood: 'intense',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I trace the shape of you through the thin, soaked fabric. You are already dripping — I can feel it. I bite your bottom lip, tugging. Your hands grip my arms.',
      prompt: 'My fingers trace the shape of you through the fabric. I can feel how wet you are. I bite your bottom lip. "Is this what you wanted?"',
      options: [
        { text: 'Yes — but you want more. I give you everything.', next: 111, transition: 'I push the fabric aside. My fingers find your bare cunt. "So wet for me."', energy: 3 },
        { text: 'You nod and pull me closer, unable to speak', next: 112, transition: 'Your silence says everything. I slide my fingers inside you. You gasp.', energy: 2 }
      ]
    },
    {
      id: 11,
      level: 2,
      mood: 'intense',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I push the fabric aside. My fingers find your bare cunt — wet, warm, dripping. I slide one finger inside you slowly, watching your face transform. Your mouth falls open.',
      prompt: 'I push your underwear aside and slide a finger inside you. You gasp. "So tight. So wet." How many fingers?',
      options: [
        { text: 'One — slowly, I feel every inch of you', next: 13, transition: 'One finger, slow and deep. You clench around me. I curl my finger inside you.', energy: 2 },
        { text: 'Two — I stretch you open', next: 113, transition: 'I add a second finger. You gasp at the stretch. "That\'s it. Take it."', energy: 3 },
        { text: 'Three — I fill you completely, you can take it', next: 36, transition: 'Three fingers stretch you wide. You cry out. I push deeper. "Good fucking girl."', energy: 3 }
      ]
    },
    {
      id: 12,
      level: 3,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I pull my hand away and sit back. You whimper at the loss. I look at you with dark, patient eyes. Your body trembles with need. I wait. The silence is a whip.',
      prompt: 'You chose to beg. I pull back and wait. Your body aches. "Beg for it. Out loud. Tell me what you want."',
      options: [
        { text: '"Please — I need your hands on me. I am burning."', next: 114, transition: 'Your begging breaks me. I grab you and shove my fingers inside you without warning.', energy: 3 },
        { text: '"I fucking touch you — you need to feel me inside you."', next: 115, transition: 'The desperation in your voice makes me hard. I give you what you need.', energy: 3 }
      ]
    },
    {
      id: 13,
      level: 3,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'My fingers curl inside you, finding that spot that makes your whole body shudder. I watch your face contort with pleasure. I want to taste every sound you make.',
      prompt: 'I curl my fingers inside you, hitting that spot that makes your vision blur. "I want to taste your moan." Do you want my mouth on yours?',
      options: [
        { text: 'Yes — I kiss you while I finger you', next: 14, transition: 'I kiss you hard, swallowing your moans while my fingers work inside you.', energy: 2 },
        { text: 'No — you watch me fall apart', next: 116, transition: 'I watch your face as I finger-fuck you. "You are so beautiful like this."', energy: 3 }
      ]
    },
    {
      id: 14,
      level: 3,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'My fingers pump inside you while my thumb circles your clit. Your hips roll against my hand. I hold your gaze. Sweat glistens on your skin. You are losing control.',
      prompt: 'My fingers pump inside you while my thumb works your clit. "Look at me. I want to see you come undone." Can you hold it?',
      options: [
        { text: 'You try but your hips are moving on their own', next: 15, transition: 'You try to hold back but your body betrays you. I speed up. "That\'s it."', energy: 3 },
        { text: 'Not if I keep doing this — I do not stop', next: 117, transition: '"Then don\'t hold back." I curl my fingers harder. You moan loudly.', energy: 3 }
      ]
    },
    {
      id: 15,
      level: 3,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I feel you tightening around my fingers. You are so close I can see it in your eyes — that desperate, beautiful look. I slow to a maddening pace. You groan.',
      prompt: 'I feel you tightening around my fingers. You are close. I slow down, keeping you on the edge. "Ask me nicely and I will let you come."',
      options: [
        { text: 'Beg me — you need it so badly', next: 16, transition: '"Good girl." I press my thumb against your clit. "Come for me."', energy: 3 },
        { text: 'I stop teasing — I make you come, now', next: 118, transition: '"Bossy." I slam my fingers into you. "Then come. Now."', energy: 3 }
      ]
    },
    {
      id: 16,
      level: 4,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I let you fall apart. My fingers never stop moving as your body convulses around them. I watch every second — your back arching, your breath catching, your cry. When you come back, I am still here.',
      prompt: 'I let you come. Hard. My fingers never stop as your body convulses. I watch every second. When you open your eyes, I am still looking. "Good girl." Now — do you want my mouth?',
      options: [
        { text: 'Yes — I put my mouth on you. You taste yourself on my lips.', next: 17, transition: 'I kiss you deep, letting you taste yourself. Then I start moving down your body.', energy: 2 },
        { text: 'Yes — I kiss you first. Then I go down and eat your cunt.', next: 119, transition: 'I kiss you slowly, then slide down your body. My tongue traces your skin.', energy: 3 }
      ]
    },
    {
      id: 17,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I kiss my way down your body. Your skin tastes like salt and sweat. I pause at your breasts, taking my time. Your nipples are hard. I circle one with my tongue.',
      prompt: 'I kiss down your body. I pause at your nipples, circling one with my tongue while my thumb teases the other. Your back arches. Bite or suck?',
      options: [
        { text: 'I suck — hard, until you gasp', next: 18, transition: 'I suck your nipple hard. You cry out. I switch to the other, giving it the same.', energy: 2 },
        { text: 'I bite — I leave a mark you will feel tomorrow', next: 120, transition: 'I bite down gently, then harder. You moan. "That will bruise beautifully."', energy: 3 }
      ]
    },
    {
      id: 18,
      level: 4,
      mood: 'intense',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I move lower, kissing your stomach, your hips. I settle between your thighs and look up at you. Your chest heaves. Your hand tangles in my hair. I smile against your skin.',
      prompt: 'I move lower, between your thighs. I look up at you. "Do not look away. Watch me." How do you want my tongue?',
      options: [
        { text: 'Flat and broad — I cover your whole cunt', next: 19, transition: 'I drag my tongue flat across your slit. You moan and grip my hair tighter.', energy: 2 },
        { text: 'Pointed and precise — I focus on your clit', next: 121, transition: 'I flick your clit with the tip of my tongue. Your hips buck. "Right there."', energy: 3 },
        { text: 'I devour you like I am starving', next: 122, transition: 'I bury my face in your cunt and eat you like I have been starving for years.', energy: 3 }
      ]
    },
    {
      id: 19,
      level: 4,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I put my mouth on you and the world disappears. Your taste floods my senses. I slide two fingers inside you while my tongue works your clit. Your hands grip my hair, pulling.',
      prompt: 'I put my mouth on you and do not hold back. My tongue works your clit. I slide two fingers inside you. How long can you last?',
      options: [
        { text: 'Not long — you are already climbing', next: 20, transition: 'I feel you getting close. I suck your clit harder. "Come in my mouth."', energy: 3 },
        { text: 'You want to hold out but I am making it impossible', next: 123, transition: 'You try to hold back. I curl my fingers inside you. You lose the fight.', energy: 3 }
      ]
    },
    {
      id: 20,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'I bring you right to the edge and stop. You cry out in frustration. I smile and kiss my way back up your body. You can feel how hard I am against your hip.',
      prompt: 'I bring you to the edge again, then stop. "Not yet. I want you desperate." I kiss back up your body. I am hard against your hip. "Do you want me inside you?"',
      options: [
        { text: 'Yes — you have never needed anything more', next: 21, transition: '"Please," you beg. I position myself at your entrance. We both hold our breath.', energy: 3 },
        { text: 'Look at me and say "yes" without breaking eye contact', next: 124, transition: 'You look me in the eye and say yes. I push in just the tip. Neither of us blinks.', energy: 3 },
        { text: 'Not yet — I want to touch you first. I want to taste you.', next: 22, transition: 'You push me onto my back. You take me in your hand. Now you are in control.', energy: 2 }
      ]
    },
    {
      id: 21,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'I position myself at your entrance. The tip of my cock presses against you. We both hold our breath. I push in just slightly and the feeling of you makes me groan.',
      prompt: 'I push in just the tip. The feeling of you — wet, warm, tight — makes me groan. "Look at me." I hold your gaze. Do you want it slow or hard?',
      options: [
        { text: 'Slow — you want to feel every inch stretch you', next: 23, transition: 'I push in slowly, inch by inch. You feel every ridge, every vein. "Fuck."', energy: 2 },
        { text: 'Hard — you want to feel claimed. I fuck you.', next: 37, transition: 'I slam into you in one brutal thrust. You scream. I do it again.', energy: 3 }
      ]
    },
    {
      id: 22,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You flip me onto my back. Now you are above me, in control. You take me in your hand and guide me to your entrance. You lower yourself slowly. Your head falls back.',
      prompt: 'You take me in your hand and guide me inside you, lowering yourself slowly. Your head falls back. "Like this?" Who is in control?',
      options: [
        { text: 'You are — you ride me slow and deep', next: 125, transition: 'You ride me slow, watching your body disappear onto mine. You set the rhythm.', energy: 2 },
        { text: 'You are — I grab your hips and take control', next: 126, transition: 'I grab your hips and slam up into you. You cry out. I fuck you from below.', energy: 3 }
      ]
    },
    {
      id: 23,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'I fill you completely and stop, buried deep. We are connected. My thumb finds your clit and draws slow circles. You tremble around me. I begin to move — long, deep strokes.',
      prompt: 'Slow and deep. I fill you completely. My thumb finds your clit. "You feel like heaven." I begin to move — long, deep strokes. What do you want me to say?',
      options: [
        { text: 'Tell me how good you feel — whisper it in my ear', next: 25, transition: 'I whisper how tight you are, how wet, how perfect. You moan with every word.', energy: 2 },
        { text: 'Tell me you belong to me', next: 127, transition: '"You are mine. Every inch of you. Say it." You say it between moans.', energy: 2 },
        { text: 'Do not speak — I fuck you', next: 128, transition: 'I shut up and fuck you deep and slow. Every thrust says what words cannot.', energy: 3 }
      ]
    },
    {
      id: 24,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'I grip your hips and drive into you hard. The sound of our bodies colliding fills the room. I wrap my hand around your throat. "You are mine."',
      prompt: 'I pound into you hard. You cry out with every thrust. I wrap my hand around your throat. "You are mine." Do you want to come with me inside you?',
      options: [
        { text: 'Yes — I make you come around my cock', next: 129, transition: '"Come for me." I fuck you through it. You clench around me, wave after wave.', energy: 3 },
        { text: 'Yes — I hold your throat and fuck you through it', next: 130, transition: 'I hold your throat and keep fucking you. You come hard, vision blurring.', energy: 3 }
      ]
    },
    {
      id: 25,
      level: 6,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🍆',
      pause: 1200,
      scene: 'I feel you tightening around me. I change the angle and hit that spot — the one that makes your eyes fly open. Your legs wrap around me, pulling me deeper.',
      prompt: 'I change the angle and hit that spot. Your legs wrap around me. "Come for me. Now."',
      options: [
        { text: 'You let go and shatter around me, crying out', next: 26, transition: 'You shatter around me. I feel every pulse. You are never more beautiful.', energy: 3 },
        { text: 'You are close — I keep going, I do not stop', next: 131, transition: '"Look at me." You do. I keep hitting that spot. You fall apart in my arms.', energy: 3 }
      ]
    },
    {
      id: 26,
      level: 6,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🍆',
      pause: 1200,
      scene: 'You come undone — body clenching, back arching, nails digging into my skin. I slow but stay deep, riding you through every wave. When you open your eyes, I am still hard inside you.',
      prompt: 'You come undone. I stay inside you. "Round two?"',
      options: [
        { text: 'Yes — I give you a minute but I do not pull out', next: 27, transition: 'We stay connected. I kiss your neck. Your hand strokes me while I am still inside.', energy: 2 },
        { text: 'Not yet — you taste yourself on me', next: 132, transition: 'You push me onto my back and take me in your mouth, tasting yourself.', energy: 3 },
        { text: 'I flip you over — I take you from behind', next: 28, transition: 'I flip you onto your stomach and enter you from behind. The new angle is devastating.', energy: 2 }
      ]
    },
    {
      id: 27,
      level: 6,
      mood: 'tender',
      energy: 3,
      symbol: '🍆',
      pause: 1200,
      scene: 'We lie tangled. Your hand strokes me slowly. I kiss your neck. "Your turn," you whisper. You roll on top, guiding me back inside. This time you do not let me look away.',
      prompt: '"Your turn." You guide me inside you again. "Look at me. Do not look away."',
      options: [
        { text: 'You hold my gaze and slide onto me slowly', next: 133, transition: 'I enter you again, never breaking eye contact. You are everything.', energy: 2 },
        { text: 'You let me take control — I set the pace', next: 134, transition: 'You ride me slow. Your eyes never leave mine. I am completely yours.', energy: 2 }
      ]
    },
    {
      id: 28,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 1200,
      scene: 'I enter you from behind. The new angle makes us both gasp. I grab your hair and pull your head back. I bite your shoulder as I thrust. You push back against me.',
      prompt: 'I enter you from behind. I grab your hair, pull your head back. "You take me so well." How fast?',
      options: [
        { text: 'Fast and relentless — I fuck you until you break', next: 38, transition: 'I fuck you hard and fast. You moan into the pillow. I do not slow down.', energy: 3 },
        { text: 'Deep and measured — I make you feel every inch', next: 29, transition: 'I push into you deep and slow. You feel every inch. We move together.', energy: 2 }
      ]
    },
    {
      id: 29,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 1200,
      scene: 'We find a rhythm. I reach around and press two fingers against your clit while I thrust into you. You moan. "I am going to fill you so full." You clench around me.',
      prompt: 'I press two fingers against your clit while I thrust into you. "I am going to fill you so full." Do you want me to come inside you?',
      options: [
        { text: 'Yes — I fill you. You want to feel it dripping out of you.', next: 30, transition: '"I am going to fucking fill you." I feel my own release building.', energy: 3 },
        { text: 'Yes — you want every drop inside you', next: 135, transition: 'I pull you closer. I need to be as deep inside you as possible.', energy: 3 }
      ]
    },
    {
      id: 30,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 1200,
      scene: 'I feel my release building, coiling at the base of my spine. I pull you closer, deeper. My breathing is ragged. "Where do you want me?" I ask, because I would give you anything.',
      prompt: 'I feel my release building. "Where do you want me?"',
      options: [
        { text: 'Inside you — you want to feel me come apart inside you', next: 31, transition: 'I bury myself deep and let go. You feel me pulse inside you. "Fuck."', energy: 3 },
        { text: 'On your chest — you want to watch me let go', next: 136, transition: 'I pull out and stroke myself over you. I come on your chest, watching your face.', energy: 3 },
        { text: 'In your mouth — I look you in the eyes', next: 137, transition: 'I kneel over your face. You take me in your mouth. I come looking into your eyes.', energy: 3 }
      ]
    },
    {
      id: 31,
      level: 7,
      mood: 'tender',
      energy: 3,
      symbol: '💦',
      pause: 1200,
      scene: 'I surrender completely. I grab you and hold you tight as I come, groaning your name. We collapse together, breathless, my face buried in your neck. Neither of us speaks.',
      prompt: 'I surrender. I come, groaning your name. We collapse together, trembling. What do you do first?',
      options: [
        { text: 'I pull you closer and kiss your forehead', next: 32, transition: 'I kiss your forehead. You smile. I hold you like you are made of glass.', energy: 1 },
        { text: 'I whisper "I love you" against your skin', next: 138, transition: 'The words slip out. You look at me. I mean it more than anything.', energy: 1 },
        { text: 'I stay inside you and hold you as tight as I can', next: 139, transition: 'I stay inside you, softening, unwilling to let go. You hold me just as tight.', energy: 2 }
      ]
    },
    {
      id: 32,
      level: 8,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🫂',
      pause: 1200,
      scene: 'The silence is full. I am still inside you, softening. Your fingers trace lazy patterns on my arm. Your skin is warm and damp. "That was not just sex," you say. "No. It was not."',
      prompt: '"That was not just sex." What do you need from me right now?',
      options: [
        { text: 'Tell me what you are feeling. I want your voice.', next: 33, transition: 'I tell you everything. How you make me feel. What it means. No holding back.', energy: 2 },
        { text: 'Do not say anything. I just hold you. You feel safe.', next: 140, transition: 'I hold you tighter. I kiss your hair. We lie in perfect silence.', energy: 1 },
        { text: 'I kiss you — deeply, slowly, like we have all night', next: 141, transition: 'I kiss you slowly, deeply. There is no rush. We have all night.', energy: 1 }
      ]
    },
    {
      id: 33,
      level: 8,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🫂',
      pause: 1200,
      scene: 'I pull out gently and turn you to face me. Your eyes are heavy, your lips swollen. I wipe a strand of hair from your face. "I could stay inside you forever."',
      prompt: 'I turn you to face me. "I could stay inside you forever." What are you thinking?',
      options: [
        { text: '"How good it feels when I take control"', next: 34, transition: '"I love watching you take what you want." I kiss your forehead.', energy: 2 },
        { text: '"How safe you feel in my arms"', next: 142, transition: '"You are safe. Always." I pull you closer. You bury your face in my chest.', energy: 1 },
        { text: '"What I want to do to you next time"', next: 143, transition: 'You whisper what you want next time. I am already hard again.', energy: 3 }
      ]
    },
    {
      id: 34,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1200,
      scene: 'We lie in the dark, tangled in each other and the sheets. Your head rests on my chest. My hand moves up and down your spine. The room is cool but we are warm.',
      prompt: '"Would you do that all over again?" What do you whisper before you fall asleep?',
      options: [
        { text: '"You are so mine. All of you. Always."', next: 300, transition: 'I kiss your hair. "And I am yours. Always." You smile against my skin.', energy: 1 },
        { text: '"I want to wake up like this every day."', next: 144, transition: '"Then we will." I hold you tighter. The future feels wide open.', energy: 1 },
        { text: '"That was everything. Do not ever let me go."', next: 145, transition: '"Never." I press a kiss to your forehead. "Never."', energy: 1 }
      ]
    },
    {
      id: 35,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1200,
      scene: 'Your breathing evens out. Your body relaxes completely against mine. I watch you sleep — the rise and fall of your chest, the soft curve of your lips. I kiss your forehead. There is nowhere else I would rather be.',
      prompt: 'You fall asleep in my arms. I hold you close. There is nowhere else I would rather be.',
      options: [
        { text: 'You sleep soundly, wrapped in me, utterly spent and safe', next: -1, transition: 'You sleep deeply, wrapped in my arms. I watch you for a moment, then follow.', energy: 1 },
        { text: 'I dream of doing it all again tomorrow', next: -1, transition: 'I fall asleep dreaming of you, of us, of doing it all again tomorrow.', energy: 1 }
      ]
    },
    {
      id: 36,
      level: 3,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'Three fingers stretch your cunt wide open. I push them deep, feeling you struggle to take it. Your face is pure need. Sweat glistens on your chest.',
      prompt: 'Three fingers stretch you wide. I push deeper, watching your face contort. "Too much?" You shake your head. "More." I fuck you harder with my hand.',
      options: [
        { text: 'Take it — you can handle anything I give you', next: 146, transition: 'You take all three fingers. I fuck you rough and deep. You love every second.', energy: 3 },
        { text: 'Deeper — I want to feel myself in your throat', next: 147, transition: 'I drive my fingers deeper, curling against your g-spot. You see stars.', energy: 3 }
      ]
    },
    {
      id: 37,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'I fuck you hard and fast. The bed shakes. Your tits bounce with every thrust. I grab your throat and squeeze lightly. "You like being fucked like this, don\'t you?"',
      prompt: 'I pound into you without mercy. Your moans are incoherent. "You like being fucked like a whore?" I slap your ass hard. The sound echoes.',
      options: [
        { text: 'Yes — I fuck you like you are mine', next: 148, transition: 'You are mine. I prove it with every brutal thrust. You take it all.', energy: 3 },
        { text: 'I go harder — you can take more', next: 149, transition: 'I give you harder. Faster. Deeper. You scream my name. I own every sound.', energy: 3 }
      ]
    },
    {
      id: 38,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 1200,
      scene: 'I fuck you without mercy. The bed creaks. You scream into the pillow. I grab your hips and pull you back onto me, over and over, relentless.',
      prompt: 'I fuck you relentlessly from behind. You can barely breathe. "You wanted it hard. Take it." I slap your ass. The sound cracks through the room.',
      options: [
        { text: 'You take it — you can handle anything I give', next: 150, transition: 'You take every brutal thrust. I am rough. You love it.', energy: 3 },
        { text: 'Harder — I do not hold back', next: 151, transition: 'I give you everything. Harder. Faster. We are both lost in it.', energy: 3 }
      ]
    },
    {
      id: 39,
      level: 7,
      mood: 'tender',
      energy: 3,
      symbol: '💦',
      pause: 1200,
      scene: 'I pull out gently and turn you onto your side, spooning you. My arm wraps around your waist. I am still hard, pressed against your ass. "That was —" I cannot find the word.',
      prompt: '"That was — something." I kiss your shoulder. "Are you okay?"',
      options: [
        { text: 'You are more than okay. You are perfect.', next: 40, transition: 'I smile against your skin. "Yes, you are."', energy: 1 },
        { text: 'I need a minute to breathe', next: 200, transition: 'I hold you and let you breathe. "Take all the time you need."', energy: 1 }
      ]
    },
    {
      id: 40,
      level: 7,
      mood: 'tender',
      energy: 3,
      symbol: '💦',
      pause: 1200,
      scene: 'We lie facing each other. I trace the line of your eyebrow, the curve of your cheek. You catch my hand and kiss my palm.',
      prompt: 'I trace your face like I am memorizing it. "What are you thinking?"',
      options: [
        { text: 'That you want to do that again. Right now.', next: 41, transition: 'I laugh. "Give me five minutes." "I will give you two."', energy: 3 },
        { text: 'That you have never felt this close to anyone', next: 201, transition: 'I kiss you softly. "Me neither."', energy: 1 },
        { text: 'That you are hungry', next: 202, transition: 'I laugh. "For food or for me?" "Both."', energy: 1 }
      ]
    },
    {
      id: 41,
      level: 7,
      mood: 'teasing',
      energy: 3,
      symbol: '💦',
      pause: 1200,
      scene: '"Two minutes," I say. I kiss you and feel the spark catch again. My hand slides down your stomach. "Or maybe one."',
      prompt: 'I kiss down your neck. "I did not think I would be ready again so soon."',
      options: [
        { text: 'You are always ready for me', next: 42, transition: 'I smile against your skin. "Good." I roll on top of you.', energy: 2 },
        { text: 'Take your time — I am not going anywhere', next: 203, transition: 'I slow down. "I love you." "I love you too."', energy: 1 }
      ]
    },
    {
      id: 42,
      level: 8,
      mood: 'intense',
      energy: 3,
      symbol: '🫂',
      pause: 1400,
      scene: 'I roll on top of you, pinning your wrists above your head. I look down at you — flushed, willing, mine. "I love having you like this."',
      prompt: '"I love having you like this." I grind against you slowly. "Tell me what you want."',
      options: [
        { text: 'You want me to fuck you until you forget your own name', next: 43, transition: '"That can be arranged." I position myself at your entrance.', energy: 3 },
        { text: 'You want to feel me inside you again', next: 204, transition: 'I slide into you. "You feel like coming home."', energy: 2 },
        { text: 'You want to be on top this time', next: 205, transition: 'I roll onto my back. "Then take what you want."', energy: 2 }
      ]
    },
    {
      id: 43,
      level: 8,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🫂',
      pause: 1400,
      scene: 'I enter you again and we both gasp. It feels different this time — slower, deeper, more deliberate. I hold still, letting you adjust, feeling every millimeter.',
      prompt: 'I am buried deep inside you. I hold still. "Feel that? Feel how deep I am?"',
      options: [
        { text: 'You feel me everywhere. I do not move.', next: 44, transition: 'I stay still, letting you feel every inch of me inside you.', energy: 2 },
        { text: 'I move. Slowly. You feel every ridge.', next: 206, transition: 'I move slowly, watching your face. Every inch, every ridge, every vein.', energy: 2 },
        { text: 'I fuck you. Hard. You can take it.', next: 207, transition: 'I fuck you hard. You cry out. The bed shakes.', energy: 3 }
      ]
    },
    {
      id: 44,
      level: 8,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🫂',
      pause: 1400,
      scene: 'I begin to move — long, slow strokes that make us both moan. I watch your face, your lips parted, your eyes half-closed. "You are beautiful like this."',
      prompt: 'I thrust slowly, deeply. "You feel — I cannot describe it."',
      options: [
        { text: 'Then do not describe it. Just feel it.', next: 45, transition: 'I stop thinking and feel. You. Me. Us.', energy: 2 },
        { text: 'Tell me — whisper it in my ear', next: 208, transition: 'I whisper how good you feel. Every dirty, beautiful word.', energy: 2 },
        { text: 'I kiss you. You want to taste my moans.', next: 209, transition: 'I kiss you, swallowing your moans as I thrust.', energy: 2 }
      ]
    },
    {
      id: 45,
      level: 8,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🫂',
      pause: 1400,
      scene: 'I speed up, chasing that rhythm that makes your eyes roll back. I find it. Your nails dig into my back. "That — right there — do not stop."',
      prompt: 'I hit that spot again. "Right there?" I do not let up.',
      options: [
        { text: 'Right there. Fuck. I do not stop.', next: 46, transition: 'I keep hitting that spot. You lose all control.', energy: 3 },
        { text: 'You are going to come. I make you wait.', next: 210, transition: 'I slow down. "Look at me." I hold your gaze. "Not yet."', energy: 3 },
        { text: 'You are going to come. I do not stop.', next: 211, transition: 'I do not stop. I fuck you through it.', energy: 3 }
      ]
    },
    {
      id: 46,
      level: 8,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🫂',
      pause: 1400,
      scene: 'I feel you tightening around me. I am close too. I press my forehead against yours. "Come with me."',
      prompt: '"I am close. So close." I reach between us and press your clit. "Come with me."',
      options: [
        { text: 'Together — you are right there', next: 47, transition: 'We come together, holding each other, falling apart.', energy: 3 },
        { text: 'You are coming — I fuck you through it', next: 212, transition: 'I fuck you through your orgasm, then follow right after.', energy: 3 },
        { text: 'I come inside you. I fill you.', next: 213, transition: 'I bury myself deep and let go. You feel me pulse inside you.', energy: 3 }
      ]
    },
    {
      id: 47,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'We lie tangled, breathless. I am still inside you, softening. You stroke my arm. Neither of us speaks. The silence is full.',
      prompt: 'I kiss your forehead. "We are good at that." You laugh softly.',
      options: [
        { text: 'We are good at everything together', next: 48, transition: 'I smile. "Yeah. We are."', energy: 1 },
        { text: 'You are so tired. I hold you.', next: 214, transition: 'I wrap myself around you. "Sleep. I have you."', energy: 1 }
      ]
    },
    {
      id: 48,
      level: 9,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I pull out and turn to face you. Your eyes are heavy, your lips swollen. You look thoroughly loved. I brush hair from your face.',
      prompt: '"I meant what I said earlier. Every word." I look into your eyes.',
      options: [
        { text: 'I meant every word too. I love you.', next: 49, transition: 'I kiss you. "I love you. More than I knew I could love anyone."', energy: 1 },
        { text: 'Say it again. Please.', next: 215, transition: '"I love you. I love you. I love you."', energy: 1 }
      ]
    },
    {
      id: 49,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'You curl into my side, your head on my chest. My hand moves up and down your spine. The future stretches out before us, bright and uncertain.',
      prompt: '"What do you want tomorrow to look like?"',
      options: [
        { text: 'You want to wake up in my arms', next: 50, transition: '"Then you will." I kiss your hair.', energy: 1 },
        { text: 'I bring you breakfast in bed', next: 216, transition: 'I laugh. "Deal. What do you want?" "You. On a plate."', energy: 1 },
        { text: 'We do this all over again', next: 217, transition: '"We have all weekend." I smile. "And all week after that."', energy: 1 }
      ]
    },
    {
      id: 50,
      level: 9,
      mood: 'teasing',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I smile. "All weekend?" I trace patterns on your skin. "What would you do with a whole weekend?"',
      prompt: '"A whole weekend. Just us. No rules." I kiss your neck. "What would you want to try?"',
      options: [
        { text: 'I tie you up', next: 51, transition: 'I raise an eyebrow. "Oh?" "Is that okay?" I kiss you. "That is more than okay."', energy: 3 },
        { text: 'I want to explore every inch of you', next: 218, transition: 'I stretch out. "Be my guest." You take your time.', energy: 2 },
        { text: 'We make love in the shower', next: 219, transition: 'I grin. "That can be arranged. Among other places."', energy: 2 }
      ]
    },
    {
      id: 51,
      level: 9,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: '"Have you done this before?" I ask, pulling back to look at you. You shake your head. "Then we go slow. Trust me?"',
      prompt: 'I hold up a silk tie. "Trust me?" You nod. I kiss you. "Then put your hands above your head."',
      options: [
        { text: 'You trust me. You are mine.', next: 52, transition: 'I tie your wrists gently. "Mine." I kiss down your body.', energy: 3 },
        { text: 'You are nervous. I go slow.', next: 220, transition: 'I stop. "We stop whenever you want." You nod. "I know. I trust you."', energy: 2 },
        { text: 'You want to try tying me up too', next: 221, transition: 'I laugh. "Fair enough. My turn after?" I put the tie down.', energy: 2 }
      ]
    },
    {
      id: 52,
      level: 9,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I kiss down your body, taking my time. Your wrists are bound above your head. You are completely open to me. I worship every inch.',
      prompt: 'I look up at you from between your thighs. "I could stay here forever."',
      options: [
        { text: 'Then stay. I am not complaining.', next: 53, transition: 'I smile against your skin. "Good." I put my mouth on you.', energy: 2 },
        { text: 'I untie you. I want to touch you.', next: 222, transition: 'I untie you. You pull me up and kiss me.', energy: 2 }
      ]
    },
    {
      id: 53,
      level: 9,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'You pull me up and kiss me. "My turn." You push me onto my back. You kiss down my chest, my stomach. I hold my breath.',
      prompt: '"My turn," you whisper. You take me in your mouth. I groan.',
      options: [
        { text: 'I do not stop. You feel incredible.', next: 54, transition: 'I cannot finish the sentence. You know.', energy: 2 },
        { text: 'I look at you while I do it', next: 223, transition: 'You look up at me, my cock in your mouth. I am done for.', energy: 3 }
      ]
    },
    {
      id: 54,
      level: 9,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I pull you up. "I need to be inside you." You straddle me and lower yourself slowly. We both moan. "This — this is everything."',
      prompt: 'You ride me slowly, your eyes never leaving mine. "I love this. I love us."',
      options: [
        { text: 'I love us too. Faster.', next: 55, transition: 'You ride me faster. I grip your hips.', energy: 2 },
        { text: 'I love this. I love you. Slower.', next: 224, transition: 'You slow down, savoring every inch. "I love you too."', energy: 1 },
        { text: 'You want to come like this — looking at me', next: 225, transition: 'I hold your gaze. "Then come. I am watching."', energy: 3 }
      ]
    },
    {
      id: 55,
      level: 9,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I grip your hips and thrust up into you, matching your rhythm. We move together perfectly, like we have done this a thousand times.',
      prompt: '"You feel — I cannot —" I give up on words and just feel you.',
      options: [
        { text: 'I know. I feel it too.', next: 56, transition: 'I kiss you. "I love you." "I love you too."', energy: 2 },
        { text: 'Do not hold back. Let go.', next: 226, transition: 'I let go. We come together. It is perfect.', energy: 3 }
      ]
    },
    {
      id: 56,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'We collapse together, spent. I hold you close. Your heart hammers against my chest. "That was —" "Perfect."',
      prompt: '"Perfect," I agree. I kiss your forehead. "Are you okay?"',
      options: [
        { text: 'You are more than okay. You are happy.', next: 57, transition: 'I smile. "Good. That is all I want."', energy: 1 },
        { text: 'You are perfect. I hold you.', next: 227, transition: 'I wrap myself around you. "Always."', energy: 1 }
      ]
    },
    {
      id: 57,
      level: 9,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I pull the sheet over us. The night air is cool but we are warm. You trace my collarbone with your finger.',
      prompt: '"Thank you," you whisper. I look at you. "For what?"',
      options: [
        { text: 'For making you feel so loved', next: 58, transition: 'I kiss you. "Thank you for letting me."', energy: 1 },
        { text: 'For trusting me enough to let go', next: 228, transition: 'I hold you. "I trust you with everything."', energy: 1 }
      ]
    },
    {
      id: 58,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'We lie in comfortable silence. The clock ticks somewhere in the dark. I have no idea what time it is. I do not care.',
      prompt: '"What are you thinking?" I ask softly.',
      options: [
        { text: 'That you never want to leave this bed', next: 59, transition: '"Then do not." I pull you closer.', energy: 1 },
        { text: 'That you are the luckiest person in the world', next: 229, transition: 'I kiss your hair. "No. I am."', energy: 1 }
      ]
    },
    {
      id: 59,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'You giggle suddenly. "What?" I ask. "Nothing. I just — this is so stupid — I am happy." I feel my chest warm.',
      prompt: '"I am happy too." I tickle your side. You squeal. "Stop!"',
      options: [
        { text: 'No — I want to hear you laugh', next: 60, transition: 'I tickle you more. Your laugh fills the room.', energy: 1 },
        { text: 'I love your laugh', next: 230, transition: 'I stop and kiss you. "I love your everything."', energy: 1 }
      ]
    },
    {
      id: 60,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'The laughter fades into soft smiles. You rest your head on my chest. I stroke your hair. The world outside this room does not exist.',
      prompt: '"This is peace," I whisper. "Right here. With you."',
      options: [
        { text: 'You have never felt peace like this', next: 61, transition: 'I hold you tighter. "Neither have I."', energy: 1 },
        { text: 'Then let us stay here forever', next: 231, transition: 'I smile. "Forever sounds perfect."', energy: 1 }
      ]
    },
    {
      id: 61,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'Your eyes close. Your breathing slows. I watch your face relax into sleep. You are so beautiful in the dim light.',
      prompt: '"Sleep," I whisper. "I will be here when you wake."',
      options: [
        { text: 'I dream of you. Always.', next: 62, transition: 'I kiss your hair. "And I dream of you."', energy: 1 },
        { text: 'You are already dreaming of tomorrow', next: 232, transition: 'I smile. "Tomorrow will be even better."', energy: 1 }
      ]
    },
    {
      id: 62,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'You are almost asleep. I feel your body go heavy against mine. I hold you, unwilling to let go even to sleep.',
      prompt: '"One more thing," I whisper. You murmur. "I love you."',
      options: [
        { text: 'I love you too. Goodnight.', next: 63, transition: 'I kiss your forehead. "Goodnight, my love."', energy: 1 },
        { text: 'I love you more. Goodnight.', next: 233, transition: 'I smile in the dark. "Impossible. But I will take it."', energy: 1 }
      ]
    },
    {
      id: 63,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I watch you sleep. Your lips curve into a small smile. I wonder what you are dreaming. I hope it is me.',
      prompt: 'I close my eyes, still holding you. Exhaustion finally takes me.',
      options: [
        { text: 'You sleep deeply, wrapped in my warmth', next: 64, transition: 'I fall asleep holding you. It is the deepest sleep I have had in years.', energy: 1 },
        { text: 'You sleep with a smile on your face', next: 234, transition: 'I dream of you. Of us. Of everything we will be.', energy: 1 }
      ]
    },
    {
      id: 64,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'Gray light filters through the curtains. I wake to find you watching me. "How long have you been awake?" "Not long. I like watching you sleep."',
      prompt: 'I smile sleepily. "Creep." You laugh. "Beautiful."',
      options: [
        { text: 'Good morning. I make love to you.', next: 65, transition: 'I pull you close. "Good morning to you too."', energy: 2 },
        { text: 'Good morning. I love you.', next: 235, transition: 'I kiss you. "I love you. Good morning."', energy: 1 }
      ]
    },
    {
      id: 65,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I roll onto you, kissing you slowly. Morning breath and all. You do not care. I do not care. We are here, together.',
      prompt: 'I look down at you in the morning light. "I could get used to this."',
      options: [
        { text: 'You better. Because I am not going anywhere.', next: 66, transition: 'I kiss you. "Good. Because neither am I."', energy: 1 },
        { text: 'Then get used to it. You are mine.', next: 236, transition: 'I smile. "And I am yours. Always."', energy: 1 }
      ]
    },
    {
      id: 66,
      level: 9,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'The morning light falls across your naked body. I trace the shadows and light on your skin with my finger. You shiver.',
      prompt: '"I want you again," I admit. "Is that greedy?"',
      options: [
        { text: 'It is not greedy. It is mutual.', next: 67, transition: 'I kiss you. "Then let us be greedy together."', energy: 2 },
        { text: 'It is perfect. I take you.', next: 237, transition: 'I slide into you. "You are perfect."', energy: 2 },
        { text: 'I make love to you in the morning light', next: 238, transition: 'I make love to you slowly, tenderly, in the golden light.', energy: 2 }
      ]
    },
    {
      id: 67,
      level: 9,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I move inside you slowly, tenderly. Morning love is different — unhurried, sweet, deep. I watch every expression on your face.',
      prompt: '"I love you," I whisper with every thrust. "I love you."',
      options: [
        { text: 'I love you too. I do not stop.', next: 68, transition: 'I do not stop. I make love to you until we both come undone.', energy: 2 },
        { text: 'I make this last', next: 239, transition: 'I slow down. "As long as you want."', energy: 2 }
      ]
    },
    {
      id: 68,
      level: 9,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I feel you tightening around me in the morning light. Your back arches. Your hands grip the sheets. I watch you come undone.',
      prompt: '"Come for me," I whisper. "Let me see you fall apart."',
      options: [
        { text: 'You come, crying out my name', next: 69, transition: 'I follow right after, holding you tight.', energy: 3 },
        { text: 'Come with me. Please.', next: 240, transition: '"Together." We fall apart together in the morning light.', energy: 3 }
      ]
    },
    {
      id: 69,
      level: 9,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'We lie tangled, breathing hard. The morning is still young. I trace your collarbone. You trace my jaw. We are both smiling.',
      prompt: '"Best morning ever?" I ask. You laugh. "Best morning ever."',
      options: [
        { text: 'We should do this every morning', next: 70, transition: '"I would like that." I kiss your nose.', energy: 1 },
        { text: 'I need coffee. And you. In that order.', next: 241, transition: 'I laugh. "Coffee first. Then you again."', energy: 1 }
      ]
    },
    {
      id: 70,
      level: 10,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'We lie in bed, talking about nothing and everything. Time stretches. The world outside does not matter.',
      prompt: '"Do you believe in forever?" I ask, tracing your palm.',
      options: [
        { text: 'I do. With you.', next: 71, transition: 'I kiss your palm. "Good. Because I have no intention of letting you go."', energy: 1 },
        { text: 'You are starting to', next: 242, transition: '"Then let me show you why you should."', energy: 1 }
      ]
    },
    {
      id: 71,
      level: 10,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I turn to face you fully. "I mean it. I do not know what the future holds, but I know I want you in it."',
      prompt: '"I know I want you in mine." I take your hand. "Promise me something?"',
      options: [
        { text: 'Anything.', next: 72, transition: '"If it ever gets hard — and it will — do not give up on us." "Never."', energy: 1 },
        { text: 'Promise me you will always talk to me', next: 243, transition: '"I promise." I kiss you. "Always."', energy: 1 }
      ]
    },
    {
      id: 72,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'We talk about the future — travel, dreams, the small things. What color to paint the kitchen. Where to go for our anniversary.',
      prompt: '"I want all of it. With you." I squeeze your hand.',
      options: [
        { text: 'I want all of it too. Every messy, beautiful part.', next: 73, transition: 'I smile. "Then let us build it together."', energy: 1 },
        { text: 'I want to marry you one day', next: 244, transition: 'I look at you. "One day?" "One day." I kiss you. "I will hold you to that."', energy: 1 }
      ]
    },
    {
      id: 73,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I pull you close. "I love our future." You smile. "Me too." We lie in comfortable silence, dreaming together.',
      prompt: '"What do you see?" I ask. "When you close your eyes and imagine us."',
      options: [
        { text: 'I see us laughing. I see us old and happy.', next: 74, transition: 'I kiss your hair. "That is all I need."', energy: 1 },
        { text: 'I see us exactly like this. Together.', next: 245, transition: '"Then my vision is the same."', energy: 1 }
      ]
    },
    {
      id: 74,
      level: 10,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I look at you — really look at you — and feel overwhelmed with gratitude. That you exist. That you chose me.',
      prompt: '"Thank you for existing," I say. You laugh. "That is weird." "I know. I mean it."',
      options: [
        { text: 'Thank you for choosing me', next: 75, transition: 'I kiss you. "Every day. I choose you every day."', energy: 1 },
        { text: 'Thank you for loving me', next: 246, transition: '"Thank you for letting me."', energy: 1 }
      ]
    },
    {
      id: 75,
      level: 10,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: '"We are going to fight sometimes," I say. "We are going to have hard days." I look at you. "But I will never stop choosing you."',
      prompt: '"Hard days are coming. But so are good ones. So many good ones."',
      options: [
        { text: 'I will never stop choosing you either.', next: 76, transition: '"Then we will be okay." I kiss you. "We will be more than okay."', energy: 1 },
        { text: 'Promise you will fight for us', next: 247, transition: '"I will fight for us every single day."', energy: 1 }
      ]
    },
    {
      id: 76,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'We lie in comfortable silence, holding each other. There is nothing left to say. Everything has been said. And yet — we will say it all again tomorrow.',
      prompt: '"I love our silences," I whisper. "They are never empty."',
      options: [
        { text: 'They are full of us.', next: 77, transition: 'I smile. "Yeah. They are."', energy: 1 },
        { text: 'I love everything about us.', next: 248, transition: 'I kiss you. "Me too. Every single thing."', energy: 1 }
      ]
    },
    {
      id: 77,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'I am spent in every good way. My body hums with the memory of you. I do not think I have ever felt this complete.',
      prompt: '"I do not think I have ever been this happy." I kiss your shoulder.',
      options: [
        { text: 'I have never been this happy either.', next: 78, transition: '"Then let us stay happy." "Deal."', energy: 1 },
        { text: 'This is only the beginning', next: 249, transition: 'I smile. "I know. And I cannot wait."', energy: 1 }
      ]
    },
    {
      id: 78,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'Your eyes close. Your body relaxes against mine. I feel your breath slow. You are beautiful in sleep — peaceful, open, trusting.',
      prompt: '"Rest," I whisper. I pull the blanket over us.',
      options: [
        { text: 'I rest, knowing I am loved.', next: 79, transition: 'I watch you sleep. You smile in your dreams.', energy: 1 },
        { text: 'I dream of us. Forever.', next: 250, transition: 'I kiss your hair. "Forever sounds perfect."', energy: 1 }
      ]
    },
    {
      id: 79,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'The world fades. I hold you and feel myself drifting. There is no place I would rather be. No one I would rather be with.',
      prompt: 'I am almost asleep. I whisper one last thing: "I love you."',
      options: [
        { text: 'I love you too. Goodnight, my love.', next: 80, transition: 'I smile in the dark. "Goodnight."', energy: 1 },
        { text: 'I love you more. Always.', next: 251, transition: '"Always." I hold you tighter.', energy: 1 }
      ]
    },
    {
      id: 80,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'We sleep, tangled in each other. Hours pass. I wake once to find you still in my arms. I kiss your forehead and fall back asleep.',
      prompt: 'The morning comes. I wake before you. I watch you breathe. I have never seen anything more beautiful.',
      options: [
        { text: 'You wake up and see me watching you. I smile.', next: 81, transition: '"Good morning, beautiful." "Good morning."', energy: 1 },
        { text: 'You wake up wrapped in me. Perfect.', next: 252, transition: 'You stir. I kiss you. "Perfect morning for a perfect person."', energy: 1 }
      ]
    },
    {
      id: 81,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'The sun is fully up now. We should get up. We should face the day. But neither of us moves.',
      prompt: '"Five more minutes," you mumble into my chest. I laugh.',
      options: [
        { text: 'Five more minutes. Then five more.', next: 82, transition: 'We stay in bed for an hour. It is the best hour of my life.', energy: 1 },
        { text: 'Ten more minutes. Then coffee.', next: 253, transition: 'I kiss your head. "Deal."', energy: 1 }
      ]
    },
    {
      id: 82,
      level: 10,
      mood: 'tender',
      energy: 3,
      symbol: '🔥',
      pause: 1400,
      scene: 'The world is waiting. But right now, there is only this — your body against mine, your breath on my skin, the quiet certainty that we belong to each other.',
      prompt: 'I look at you. "Ready to face the world?"',
      options: [
        { text: 'As long as I face it with you', next: -1, transition: 'I take your hand. "Then I am ready for anything."', energy: 1 },
        { text: 'Ready. But I am taking you with me.', next: 254, transition: 'You laugh. "Good. I was not planning on letting you go anyway."', energy: 1 }
      ]
    },
    {
      id: 100,
      level: 1,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I settle against you, my body warm along yours. I feel your heart hammering. You wanted this — I can feel it in the way your hands grip my shirt.',
      prompt: 'I pull back just enough to see your eyes. "How long have you wanted this?"',
      options: [
        { text: 'So long I stopped counting', next: 8, transition: 'I kiss you. "Then let us make up for lost time."', energy: 2 },
        { text: 'Since the first time I saw you', next: 8, transition: 'You smile. I smile back. "Then you are going to enjoy tonight."', energy: 2 }
      ]
    },
    {
      id: 101,
      level: 0,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'I cup your face and kiss you hard — not gentle, not asking. My tongue claims your mouth. I want you to feel owned.',
      prompt: 'I break the kiss. "You are mine. Say it."',
      options: [
        { text: 'You are mine. Every fucking inch.', next: 7, transition: '"Good girl." I kiss you again, softer this time.', energy: 3 },
        { text: 'I prove it.', next: 7, transition: 'I bite your lip. "Oh, I will." My hand slides down your body.', energy: 3 }
      ]
    },
    {
      id: 102,
      level: 0,
      mood: 'tender',
      energy: 1,
      symbol: '🔥',
      pause: 1500,
      scene: 'I kiss your forehead, your eyelids, the tip of your nose. I am in no rush. I want to memorize every inch of you with my lips.',
      prompt: 'My lips trace down your jaw. "You are beautiful. Do you know that?"',
      options: [
        { text: 'Show me how beautiful I think you are', next: 6, transition: 'I smile against your skin and continue my worship.', energy: 1 },
        { text: 'You are starting to believe it', next: 5, transition: '"Good. Let me prove it." I kiss your neck.', energy: 1 }
      ]
    },
    {
      id: 103,
      level: 0,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1100,
      scene: 'I feel your breath against my lips as you say my name. The sound of it in your mouth undoes me. I pull you into a kiss that says everything words cannot.',
      prompt: 'I kiss you until we both need air. "Say my name again."',
      options: [
        { text: 'I say it again, softer this time', next: 7, transition: 'I kiss you again, slower. "I will never get tired of hearing that."', energy: 2 },
        { text: 'I whisper it against your lips', next: 4, transition: 'You say it so softly I almost miss it. I kiss you like it is the first time.', energy: 1 }
      ]
    },
    {
      id: 104,
      level: 1,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1000,
      scene: 'I press my palm against your clothed cunt and feel the heat radiating through the fabric. You grind against my hand like you cannot help yourself.',
      prompt: '"So eager," I tease. "Is this what you want?" I press harder.',
      options: [
        { text: 'Yes — I do not stop', next: 9, transition: 'I keep pressing, feeling you get wetter through the denim.', energy: 3 },
        { text: 'Harder — you will feel it tomorrow', next: 10, transition: 'I press harder, watching your face. You bite your lip.', energy: 3 }
      ]
    },
    {
      id: 105,
      level: 1,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I grip your ribs and pull you flush against me. You feel how hard I am. I hold you there, letting you feel every inch of my want.',
      prompt: '"Feel that?" I grind against you slowly. "That is what you do to me."',
      options: [
        { text: 'I want to feel more of you', next: 11, transition: 'I guide your hand down. "Then touch me."', energy: 2 },
        { text: 'I want to be inside you', next: 8, transition: '"Patience." I kiss your neck. "We will get there."', energy: 2 }
      ]
    },
    {
      id: 106,
      level: 1,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'I whisper the filthiest things into your ear — exactly how I am going to take you apart, piece by piece. Your knees buckle. I hold you up.',
      prompt: '"You like that, don\'t you? Hearing exactly what I will do to you?"',
      options: [
        { text: 'Yes — I tell you more, all of it', next: 11, transition: 'I whisper more. Every word makes you wetter.', energy: 3 },
        { text: 'I do it now — you cannot wait', next: 8, transition: '"Then let us not wait." I pull you toward the bed.', energy: 3 }
      ]
    },
    {
      id: 107,
      level: 1,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1300,
      scene: '"You are mine," I growl against your neck. I bite down gently, marking you. You gasp and press closer.',
      prompt: '"Say it back." I look into your eyes.',
      options: [
        { text: 'You are mine. Completely.', next: 11, transition: 'I kiss you. "That is my girl."', energy: 2 },
        { text: 'And you are mine.', next: 11, transition: 'I smile. "Always." I kiss you deeply.', energy: 1 }
      ]
    },
    {
      id: 108,
      level: 1,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'You spread your legs wide. I groan and slide my hand higher, feeling the heat of your cunt through your underwear. "So eager for me."',
      prompt: 'My fingers trace the wet spot on your underwear. "Is this all for me?"',
      options: [
        { text: 'All for you. Every drop.', next: 10, transition: 'I smile. "Good. Because I intend to earn every single one."', energy: 3 },
        { text: 'Yes — I stop teasing, you get all of it', next: 11, transition: '"Bossy." I press harder. "I will go at my pace."', energy: 2 }
      ]
    },
    {
      id: 109,
      level: 2,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I trace slow, maddening circles on your belly, each one lower than the last. Your muscles clench under my touch. You are holding your breath.',
      prompt: '"Relax," I whisper. "I am going to take care of you." My fingers dip lower.',
      options: [
        { text: 'Trust me — I take you there', next: 13, transition: 'I smile and slide my hand into your waistband.', energy: 2 },
        { text: 'Hurry up — I need you', next: 12, transition: '"Impatient." But I give you what you want.', energy: 2 }
      ]
    },
    {
      id: 110,
      level: 2,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 1100,
      scene: 'I press my fingers against you through the wet fabric. The thin cotton is soaked through. I can feel the heat of your cunt through it.',
      prompt: '"You are soaking through your underwear," I murmur. "Do you like being teased this much?"',
      options: [
        { text: 'You love it — I do not stop', next: 12, transition: 'I keep pressing, feeling you get wetter.', energy: 2 },
        { text: 'I love you — now I fuck you', next: 36, transition: 'I laugh. "I love you too. And I will."', energy: 2 }
      ]
    },
    {
      id: 111,
      level: 2,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'I push the fabric aside and slide my fingers through your wet folds. You are soaked. I circle your clit slowly, watching your face.',
      prompt: '"So wet. So ready." I slide one finger inside you. "Is this what you wanted?"',
      options: [
        { text: 'Yes. More. You beg for it.', next: 14, transition: 'I add a second finger. You gasp and arch into my hand.', energy: 3 },
        { text: 'You have no idea how much I needed this', next: 15, transition: 'I curl my fingers inside you. "I think I do."', energy: 3 }
      ]
    },
    {
      id: 112,
      level: 2,
      mood: 'tender',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'Your silence says everything your voice cannot. I slide my fingers inside you slowly, watching your face transform. Your mouth opens but no sound comes out.',
      prompt: '"Shh. I know." I move my fingers slowly. "Just feel."',
      options: [
        { text: 'You feel everything. I do not stop.', next: 12, transition: 'I keep moving. Slow. Deep. Perfect.', energy: 2 },
        { text: 'I love you.', next: 14, transition: 'I kiss you. "I love you too. So much."', energy: 1 }
      ]
    },
    {
      id: 113,
      level: 2,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'I push two fingers inside you. The stretch makes you gasp. I hold still, letting you adjust, feeling you clench around me.',
      prompt: '"Look at me." I wait until you do. "You take my fingers so well." I begin to move.',
      options: [
        { text: 'I fuck you with them — I do not hold back', next: 13, transition: 'I finger-fuck you slow and deep. You moan with every thrust.', energy: 3 },
        { text: 'I want you to taste yourself on my fingers', next: 14, transition: 'I pull my fingers out and hold them to your lips. You open your mouth.', energy: 3 }
      ]
    },
    {
      id: 114,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'I grab you and shove my fingers inside you without warning. You cry out. I watch your face as I fuck you with my hand, rough and deep.',
      prompt: '"That is what you wanted, isn\'t it? To be taken?"',
      options: [
        { text: 'Yes. Fuck. This is everything.', next: 17, transition: 'I curl my fingers and hit that spot. You see stars.', energy: 3 },
        { text: 'Harder. I give it harder.', next: 17, transition: 'I fuck you harder. You take every inch of my fingers.', energy: 3 }
      ]
    },
    {
      id: 115,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'The desperation in your voice breaks something in me. I pull you against me and slide my fingers into your wet heat. You moan into my mouth.',
      prompt: '"You need this so badly, don\'t you?" I pump my fingers slowly.',
      options: [
        { text: 'So badly. I do not stop.', next: 18, transition: 'I do not stop. I watch you fall apart.', energy: 3 },
        { text: 'I make you come. Now.', next: 17, transition: '"Begging is a good look on you." I speed up.', energy: 3 }
      ]
    },
    {
      id: 116,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'I watch your face as I fuck you with my fingers. Every micro-expression — the flutter of your eyelids, the parting of your lips, the way your back arches.',
      prompt: '"You are so beautiful like this. Do you have any idea?" I curl my fingers.',
      options: [
        { text: 'I show you — I make you watch us', next: 19, transition: 'I hold your gaze and make you watch me finger-fuck you.', energy: 3 },
        { text: 'You are going to come', next: 18, transition: '"Not yet." I slow down. "Not until I say."', energy: 3 }
      ]
    },
    {
      id: 117,
      level: 3,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 1000,
      scene: 'I curl my fingers harder, hitting that spot relentlessly. You moan loudly, not caring who hears. Your hips grind against my hand.',
      prompt: '"That\'s it. Let go. I have you."',
      options: [
        { text: 'You are so close — I do not stop', next: 19, transition: 'I do not stop. I push you right to the edge.', energy: 3 },
        { text: 'I make you come. Now. Right now.', next: 18, transition: 'I press my thumb against your clit and curl my fingers. "Come for me."', energy: 3 }
      ]
    },
    {
      id: 118,
      level: 3,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: '"Bossy." I slam my fingers into you hard and fast. Your body responds instantly, clenching around me. I watch you come undone.',
      prompt: '"That is it. Come for me. Let me feel you."',
      options: [
        { text: 'You come hard, crying out my name', next: 16, transition: 'I fuck you through every wave. You are perfect.', energy: 3 },
        { text: 'You come silently, shaking apart', next: 19, transition: 'I watch every silent tremor. "Beautiful."', energy: 3 }
      ]
    },
    {
      id: 119,
      level: 4,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💋',
      pause: 1100,
      scene: 'I kiss you slowly, tasting you on my lips. Then I slide down your body, my tongue leaving a wet trail down your stomach.',
      prompt: 'I settle between your thighs. "I have been thinking about this all night."',
      options: [
        { text: 'I stop thinking and I taste you', next: 24, transition: 'I bury my face in your cunt. You grip my hair.', energy: 3 },
        { text: 'I look at you while I do it', next: 22, transition: 'I look up at you and drag my tongue through your folds.', energy: 3 }
      ]
    },
    {
      id: 120,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1000,
      scene: 'I bite down on your nipple, hard enough to make you gasp. I soothe it with my tongue. "One more?" I ask against your skin.',
      prompt: 'You nod. I bite the other nipple, harder this time. You cry out and arch into my mouth.',
      options: [
        { text: 'I mark you. You will see it tomorrow.', next: 20, transition: 'I leave a dark bruise. You hiss. "Perfect."', energy: 3 },
        { text: 'I bite harder — you can take it.', next: 37, transition: 'I bite harder. You moan. "Good girl."', energy: 3 }
      ]
    },
    {
      id: 121,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'I focus the tip of my tongue on your clit, flicking fast and precise. Your hips buck against my face. I hold you down and keep going.',
      prompt: '"Right there?" I ask, not stopping. "Do not move." I suck your clit into my mouth.',
      options: [
        { text: 'Right there — I do not stop', next: 20, transition: 'I do not stop. I feel you getting close.', energy: 3 },
        { text: 'I go faster — you are almost there', next: 22, transition: 'I flick faster. You grip my hair and cry out.', energy: 3 }
      ]
    },
    {
      id: 122,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'I bury my face in your cunt like I have been starving for years. I lick and suck and devour you. You are incoherent above me.',
      prompt: 'I come up for air. "You taste like heaven." I dive back in.',
      options: [
        { text: 'I do not stop. Ever.', next: 22, transition: 'I do not stop. I worship you with my mouth.', energy: 3 },
        { text: 'I am going to come on your face', next: 37, transition: 'I groan against you and redouble my efforts.', energy: 3 }
      ]
    },
    {
      id: 123,
      level: 4,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: 'You try to hold back but I curl my fingers inside you and you lose the fight. Your body convulses against my mouth. I do not stop.',
      prompt: 'I lick you through your orgasm, slowing only when you push my head away. "Good girl."',
      options: [
        { text: 'That was — you cannot even speak', next: 22, transition: 'I smile, kissing my way up your body. "I know."', energy: 2 },
        { text: 'I do that again. Now.', next: 37, transition: '"Eager." I lower my head again. "I love that about you."', energy: 3 }
      ]
    },
    {
      id: 124,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 1000,
      scene: 'You look me in the eye and say yes. I hold your gaze as I position myself at your entrance. I push in just the tip. We do not blink.',
      prompt: '"Look at me. I want to see your eyes when I fill you." I push deeper.',
      options: [
        { text: 'I fill you. All of it.', next: 38, transition: 'I push into you slowly, watching your face change.', energy: 3 },
        { text: 'I love you. Now I fuck you.', next: 38, transition: 'I kiss you. "I love you too." I thrust deep.', energy: 3 }
      ]
    },
    {
      id: 125,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You ride me slow, watching your body disappear onto mine. You set the rhythm, taking me as deep as you want. I let you control everything.',
      prompt: '"Like this?" You roll your hips. I groan. "Just like that."',
      options: [
        { text: 'You love being in control', next: 25, transition: 'I watch you take what you want. "Then take it."', energy: 2 },
        { text: 'I love that you let me', next: 26, transition: 'I smile. "I would give you anything."', energy: 1 }
      ]
    },
    {
      id: 126,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 900,
      scene: 'I grab your hips and slam up into you, fucking you from below. You cry out with every thrust. I take control back.',
      prompt: '"You wanted me in control?" I thrust harder. "Then take it."',
      options: [
        { text: 'Yes — I fuck you like I mean it', next: 38, transition: 'I mean it. I fuck you hard and deep.', energy: 3 },
        { text: 'I go harder — you can take more', next: 25, transition: 'I give you everything I have. You take it all.', energy: 3 }
      ]
    },
    {
      id: 127,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: '"You are mine," I whisper against your lips. "Every inch of you. Say it." You say it between moans and I feel it in my chest.',
      prompt: '"Again." I thrust deep. "Who do you belong to?"',
      options: [
        { text: 'You. You belong to me.', next: 27, transition: '"That is right." I kiss you. "And I belong to you."', energy: 2 },
        { text: 'Mine. Only mine.', next: 26, transition: 'I hold you tighter. "Always."', energy: 1 }
      ]
    },
    {
      id: 128,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 1000,
      scene: 'I shut up and fuck you. Deep. Slow. Every thrust says what words cannot. The only sounds are our breathing and the wet sound of our bodies.',
      prompt: 'I change the angle and hit deeper. Your eyes roll back. "That spot?"',
      options: [
        { text: 'Yes — right there. I do not stop.', next: 27, transition: 'I hit that spot again and again. You lose your mind.', energy: 3 },
        { text: 'I go faster — you are close', next: 25, transition: 'I fuck you faster, still hitting that spot.', energy: 3 }
      ]
    },
    {
      id: 129,
      level: 5,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: '"Come for me." I fuck you through it. You clench around me, wave after wave. I do not stop. I ride you through every pulse.',
      prompt: 'When you come back, I am still hard inside you. "More?"',
      options: [
        { text: 'More. I do not stop.', next: 27, transition: 'I keep going. Building you up again.', energy: 3 },
        { text: 'I give you a second — I do not pull out', next: 38, transition: 'I stay inside you, kissing your neck.', energy: 2 }
      ]
    },
    {
      id: 130,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 900,
      scene: 'I hold your throat and keep fucking you through your orgasm. Your vision blurs. You come harder than you thought possible.',
      prompt: 'I release your throat. You gasp for air. "Good girl. Again."',
      options: [
        { text: 'You cannot — you are still coming', next: 26, transition: '"You can." I keep thrusting. "One more."', energy: 3 },
        { text: 'I make you come — you asked so nicely', next: 25, transition: 'I do. I fuck you until you come again.', energy: 3 }
      ]
    },
    {
      id: 131,
      level: 6,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: '"Look at me." You do. I keep hitting that spot — deep, relentless. You fall apart in my arms. I feel every pulse of your orgasm.',
      prompt: 'I hold you through it. "That is it. Let go. I have you."',
      options: [
        { text: 'You shatter in my arms, wave after wave', next: 31, transition: 'You shatter and I feel every pulse. You are perfect.', energy: 3 },
        { text: 'You grip my back and let it take you', next: 30, transition: 'You grip me and I hold you through every tremor.', energy: 3 }
      ]
    },
    {
      id: 132,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'You push me onto my back and take me in your mouth, tasting yourself on my skin. The sight of you — lips around me — is almost too much.',
      prompt: 'You look up at me, my cock in your mouth. I groan. "You are so fucking beautiful."',
      options: [
        { text: 'You deep-throat me, not breaking eye contact', next: 31, transition: 'I grip your hair. "Fuck. Yes."', energy: 3 },
        { text: 'You take me to the back of your throat', next: 31, transition: 'I feel you hit the back of your throat. You do not flinch.', energy: 3 }
      ]
    },
    {
      id: 133,
      level: 6,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I enter you again, never breaking eye contact. You are everything. The world narrows to just us, just this, just the way you feel around me.',
      prompt: 'I move inside you slowly. "I love you. You know that, right?"',
      options: [
        { text: 'I know. I love you too.', next: 31, transition: 'I kiss you. "Good. Because I am never letting you go."', energy: 1 },
        { text: 'Show me.', next: 29, transition: 'I make love to you like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 134,
      level: 6,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1300,
      scene: 'You ride me slow, setting the pace. Your eyes never leave mine. I am completely yours. I let you take everything you need.',
      prompt: '"You feel so good inside me." You roll your hips. I groan.',
      options: [
        { text: 'You love feeling me inside you', next: 30, transition: 'I smile. "I love being inside you."', energy: 1 },
        { text: 'You never want this to end', next: 31, transition: '"Then let us make it last." I hold your hips.', energy: 2 }
      ]
    },
    {
      id: 135,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 1000,
      scene: 'I pull you closer, needing to be as deep as possible. I press two fingers against your clit and thrust into you. We are both close.',
      prompt: '"I am going to fill you so full." I am barely holding on.',
      options: [
        { text: 'I fill you. I give you all of it.', next: 33, transition: 'I let go, burying myself deep. You feel me pulse inside you.', energy: 3 },
        { text: 'I come inside you. I claim you.', next: 33, transition: 'I come harder than I have in months. You take all of it.', energy: 3 }
      ]
    },
    {
      id: 136,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 1000,
      scene: 'I pull out and stroke myself over you, watching your face. I come on your chest — hot ropes of release. You watch me, breathless.',
      prompt: 'I collapse beside you. "Fuck. That was —" You kiss me before I can finish.',
      options: [
        { text: 'That was perfect', next: 33, transition: 'I kiss you back. "You are perfect."', energy: 2 },
        { text: 'You love watching me come', next: 33, transition: 'I smile. "I love making you watch."', energy: 2 }
      ]
    },
    {
      id: 137,
      level: 7,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'I kneel over your face. You take me in your mouth, looking up at me. I hold your gaze as I come, groaning your name.',
      prompt: 'I collapse beside you. "I love you. I love your mouth. I love everything about you."',
      options: [
        { text: 'I love you too. I can taste us.', next: 33, transition: 'I kiss you. "That is the taste of us."', energy: 2 },
        { text: 'I do that again. You ask so sweetly.', next: 32, transition: 'I laugh. "Give me five minutes."', energy: 2 }
      ]
    },
    {
      id: 138,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1500,
      scene: 'The words slip out — "I love you" — and I do not take them back. I look at you. I mean it more than I have ever meant anything.',
      prompt: '"I love you," I say again, clearer this time. You smile. I feel it in my chest.',
      options: [
        { text: 'I love you too. So much.', next: 33, transition: 'I kiss you. Soft. "I know. I feel it."', energy: 1 },
        { text: 'Say it again.', next: 32, transition: '"I love you. I love you. I love you."', energy: 1 }
      ]
    },
    {
      id: 139,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1500,
      scene: 'I stay inside you, softening, unwilling to let go. You hold me just as tight. We lie together, connected, breathing as one.',
      prompt: 'I kiss your shoulder. "I could stay here forever."',
      options: [
        { text: 'Then stay.', next: 32, transition: 'I smile against your skin. "I am not going anywhere."', energy: 1 },
        { text: 'Forever is not long enough.', next: 32, transition: 'I hold you tighter. "Then longer."', energy: 1 }
      ]
    },
    {
      id: 140,
      level: 8,
      mood: 'vulnerable',
      energy: 1,
      symbol: '🫂',
      pause: 1800,
      scene: 'I hold you tighter and kiss your hair. We lie in perfect silence. Your breathing slows. You press closer. The silence is not empty — it is full of everything we feel.',
      prompt: 'After a long moment, you whisper, "Thank you." I kiss your forehead.',
      options: [
        { text: 'For what?', next: 34, transition: '"For making me feel safe." I hold you tighter. "Always."', energy: 1 },
        { text: 'I love you.', next: 34, transition: 'I smile. "I love you too. Rest now."', energy: 1 }
      ]
    },
    {
      id: 141,
      level: 8,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1500,
      scene: 'I kiss you slowly, deeply. There is no rush. We have all night. My hand cradles your face like you are the most precious thing in the world.',
      prompt: 'I pull back. "I could kiss you forever." You smile. "Prove it."',
      options: [
        { text: 'I kiss you again, softer this time', next: 35, transition: 'I kiss you like I am memorizing the shape of your lips.', energy: 1 },
        { text: 'I kiss you until we are both breathless', next: 34, transition: 'We break the kiss laughing. "Okay. I believe you."', energy: 1 }
      ]
    },
    {
      id: 142,
      level: 8,
      mood: 'vulnerable',
      energy: 1,
      symbol: '🫂',
      pause: 1800,
      scene: '"You are safe," I whisper. "Always." I pull you closer and you bury your face in my chest. I wrap myself around you like a shield.',
      prompt: 'Your breathing evens out. I stroke your hair. "I have you."',
      options: [
        { text: 'I know. I feel it.', next: 35, transition: 'I kiss your hair. "Good. That is all I want."', energy: 1 },
        { text: 'Do not ever let me go.', next: 34, transition: 'I hold you tighter. "Not a chance."', energy: 1 }
      ]
    },
    {
      id: 143,
      level: 8,
      mood: 'teasing',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'You whisper exactly what you want me to do to you next time. Every dirty detail. I am already hard again, pressed against your thigh.',
      prompt: '"Is that so?" I roll you onto your back. "Maybe we do not wait for next time."',
      options: [
        { text: 'You are ready. I take you again.', next: 34, transition: 'I slide into you. "You are insatiable." "You made me this way."', energy: 3 },
        { text: 'You want to, but you are so sore', next: 34, transition: 'I kiss you. "Then let me hold you. We have all the time in the world."', energy: 1 }
      ]
    },
    {
      id: 144,
      level: 9,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1800,
      scene: '"Then we will," I say. I hold you tighter and the future feels wide open. I can see it — mornings with you, nights with you, everything in between.',
      prompt: '"Promise?" you whisper. I kiss your forehead. "I promise."',
      options: [
        { text: 'I believe you.', next: 34, transition: 'I smile. "Good. Now sleep. I will be here when you wake up."', energy: 1 },
        { text: 'I love our future.', next: 35, transition: 'I kiss your hair. "Me too. And it starts tomorrow."', energy: 1 }
      ]
    },
    {
      id: 145,
      level: 9,
      mood: 'vulnerable',
      energy: 1,
      symbol: '🫂',
      pause: 2000,
      scene: '"Never," I promise. I press a kiss to your forehead. You cling to me like I am the only solid thing in a spinning world. I will be. I will always be.',
      prompt: '"I love you," you whisper. I feel it in my chest. "I love you too."',
      options: [
        { text: 'I love you more.', next: 34, transition: '"Impossible." I kiss you. "But I will take the challenge."', energy: 1 },
        { text: 'Say it again tomorrow.', next: 34, transition: 'I laugh softly. "I will say it every day."', energy: 1 }
      ]
    },
    {
      id: 146,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'You take all three fingers. I fuck you rough and deep, watching your face contort with pleasure. You love every second of it.',
      prompt: '"You take me so well." I curl my fingers. "Does that feel good?"',
      options: [
        { text: 'So good. I do not stop.', next: 17, transition: 'I do not stop. I fuck you until you scream.', energy: 3 },
        { text: 'Fuck. Yes. Right there.', next: 16, transition: 'I hit that spot again. You lose control.', energy: 3 }
      ]
    },
    {
      id: 147,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'I drive my fingers deeper, curling against your g-spot. You see stars. Your whole body clenches around my hand.',
      prompt: '"You are going to come on my fingers, aren\'t you?" I feel you tightening.',
      options: [
        { text: 'Yes. I do not stop.', next: 18, transition: 'I finger-fuck you through your orgasm.', energy: 3 },
        { text: 'I make you come — you asked so nicely', next: 17, transition: 'I press harder and curl. You explode around my hand.', energy: 3 }
      ]
    },
    {
      id: 148,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 900,
      scene: 'You are mine. I prove it with every brutal thrust. You take all of it — every inch, every slam. You are perfect like this.',
      prompt: '"Whose are you?" I demand, slowing just enough to make you answer.',
      options: [
        { text: 'Mine. You are mine.', next: 28, transition: '"That is right." I slam into you. "Never forget it."', energy: 3 },
        { text: 'Mine. Now I fuck you.', next: 27, transition: '"Bossy." But I obey.', energy: 3 }
      ]
    },
    {
      id: 149,
      level: 5,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: 'I fuck you harder. Faster. Deeper. You scream my name. I own every sound that leaves your lips. We are both lost in it.',
      prompt: '"You are going to come for me. Now." I reach around and press your clit.',
      options: [
        { text: 'You are coming — fuck — I do not stop', next: 27, transition: 'I fuck you through it. You clench so tight.', energy: 3 },
        { text: 'I make you come with me', next: 26, transition: 'I am close. "Together." We fall apart together.', energy: 3 }
      ]
    },
    {
      id: 150,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 900,
      scene: 'You take every brutal thrust. I am rough with you and you love it. I slap your ass again. The sound echoes off the walls.',
      prompt: '"You like that, don\'t you?" I grab your hair and pull your head back.',
      options: [
        { text: 'Yes. I do not stop.', next: 29, transition: 'I do not stop. I ruin you for anyone else.', energy: 3 },
        { text: 'You love it. And I love you.', next: 31, transition: 'I slow down. "I love you too." Then I fuck you again.', energy: 3 }
      ]
    },
    {
      id: 151,
      level: 6,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: 'I give you everything. Harder. Faster. Deeper. We are both lost in it — nothing exists but the place where our bodies meet.',
      prompt: '"Come for me." I press deep and hold. "Come around my cock."',
      options: [
        { text: 'You come, screaming into the pillow', next: 30, transition: 'I fuck you through every wave. You collapse beneath me.', energy: 3 },
        { text: 'You come, reaching back for me', next: 31, transition: 'I grab your hand and hold it as we come together.', energy: 3 }
      ]
    },
    {
      id: 200,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'We move together in perfect rhythm, two bodies becoming one. There is nothing else like this.',
      prompt: '"You feel like heaven," I groan. "Perfect."',
      options: [
        { text: 'You melt into the rhythm, lost in me', next: 35, transition: 'You melt into me and we become one, moving together.', energy: 2 },
        { text: 'You match my pace, breathless and mine', next: 35, transition: 'You match me perfectly, two bodies in perfect sync.', energy: 2 }
      ]
    },
    {
      id: 201,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I taste you on my lips and I am addicted. I will never get enough of you.',
      prompt: '"I am yours," I whisper. "All of me."',
      options: [
        { text: 'I pull you deeper, wanting more of you', next: 35, transition: 'You pull me deeper and I give you everything. All of me.', energy: 3 },
        { text: 'I kiss you like I need you to breathe', next: 35, transition: 'You kiss me with desperate hunger and I match it.', energy: 3 }
      ]
    },
    {
      id: 202,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'You arch into me, asking for more without words. I give you everything. I will always give you everything.',
      prompt: '"Take what you need," I offer. "I am yours."',
      options: [
        { text: 'You take everything I offer, greedy for it', next: 35, transition: 'You take and I give. Again and again. Always.', energy: 3 },
        { text: 'You arch harder, pressing into every inch of me', next: 35, transition: 'You arch into me and I fill you completely.', energy: 2 }
      ]
    },
    {
      id: 203,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'The heat between us is undeniable. I pull you closer, needing to feel every inch of your skin against mine.',
      prompt: '"Again?" I ask, already moving.',
      options: [
        { text: 'Yes — you are burning, I do not stop', next: 35, transition: 'You are on fire and I stoke every flame.', energy: 3 },
        { text: 'You press closer, skin on skin, needing me', next: 35, transition: 'You press into me and the heat consumes us both.', energy: 2 }
      ]
    },
    {
      id: 204,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I whisper your name like a prayer. You respond with a moan that goes straight through me.',
      prompt: '"I can feel you getting close," I murmur. "Let go."',
      options: [
        { text: 'You are so close — stay with me', next: 35, transition: 'You hover on the edge and I am right there with you.', energy: 2 },
        { text: 'You moan my name back, trembling on the edge', next: 35, transition: 'You moan my name and it pushes me closer to the edge.', energy: 3 }
      ]
    },
    {
      id: 205,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'We are both trembling, both holding on, both ready to let go. I wait for you. I will always wait for you.',
      prompt: '"Look what you do to me," I say, guiding your hand.',
      options: [
        { text: 'You feel how hard I am for you and you want it', next: 35, transition: 'You feel me and your breath catches. We are both trembling.', energy: 3 },
        { text: 'You wrap your hand around me, matching my rhythm', next: 35, transition: 'Your hand guides mine and we move together, ready.', energy: 2 }
      ]
    },
    {
      id: 206,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'Your hands grip my back as I move inside you. I feel your nails, your breath, your heartbeat.',
      prompt: '"You are mine," I claim. "Every inch."',
      options: [
        { text: 'You dig your nails deeper, claiming me back', next: 35, transition: 'Your nails mark my back. I am yours as much as you are mine.', energy: 3 },
        { text: 'You wrap your legs around me, pulling me deeper', next: 35, transition: 'You pull me deeper and I feel every inch of you inside me.', energy: 3 }
      ]
    },
    {
      id: 207,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I look into your eyes and see everything I need. You. Always you.',
      prompt: '"I love the sounds you make," I say. "Do not hold back."',
      options: [
        { text: 'You let every sound escape, you trust me with all of it', next: 35, transition: 'You let go of every sound and I drink them in. Beautiful.', energy: 2 },
        { text: 'You moan freely, giving me every part of you', next: 35, transition: 'You moan without restraint and it is the most beautiful sound.', energy: 2 }
      ]
    },
    {
      id: 208,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'The world narrows to the space between us. There is nothing outside this room.',
      prompt: '"Let go," I whisper. "I have you."',
      options: [
        { text: 'You let go, falling into me completely', next: 35, transition: 'You fall and I catch you. There is nothing but us.', energy: 2 },
        { text: 'You close your eyes and trust me to hold you', next: 35, transition: 'You close your eyes and surrender. I hold you tight.', energy: 1 }
      ]
    },
    {
      id: 209,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I feel your release building, feel you clench around me. I hold on, wanting to share every second.',
      prompt: '"Are you close?" I ask, feeling you tighten around me.',
      options: [
        { text: 'You are right there — I do not stop', next: 35, transition: 'You tighten around me and I feel your release building with mine.', energy: 3 },
        { text: 'You feel me everywhere — you are coming apart', next: 35, transition: 'You come apart around me and I follow, holding on.', energy: 3 }
      ]
    },
    {
      id: 210,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'You cry out and I feel it in my bones. I will never forget this sound.',
      prompt: '"Look at me," I command softly. "I want to see your eyes."',
      options: [
        { text: 'You look into my eyes and cry out my name', next: 35, transition: 'You meet my eyes and I see everything in them. Perfect.', energy: 3 },
        { text: 'You hold my gaze and let the pleasure take you', next: 35, transition: 'You hold my gaze and I watch you come undone.', energy: 2 }
      ]
    },
    {
      id: 211,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'I pull you against me, needing you as close as possible. Even then, it is not close enough.',
      prompt: '"Do you trust me?" I ask, pausing. You nod.',
      options: [
        { text: 'You trust me — I do not let you go', next: 35, transition: 'You trust me and I hold you closer than close.', energy: 2 },
        { text: 'You nod and pull me impossibly closer', next: 35, transition: 'You pull me closer and I feel your heart against mine.', energy: 1 }
      ]
    },
    {
      id: 212,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'Your skin is slick with sweat. I taste salt and you. I want more.',
      prompt: '"More?" I ask. You nod frantically.',
      options: [
        { text: 'Yes — you need more, you need all of me', next: 35, transition: 'You need more and I give you everything I have.', energy: 3 },
        { text: 'You taste my sweat on your lips and beg for more', next: 35, transition: 'You taste me on your lips and we are both desperate for more.', energy: 3 }
      ]
    },
    {
      id: 213,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I am lost in you — your smell, your taste, the way you say my name when you are close.',
      prompt: '"Say my name," I whisper. "I want to hear it."',
      options: [
        { text: 'You whisper my name like it is the only word you know', next: 35, transition: 'You whisper my name and I feel it in my soul.', energy: 2 },
        { text: 'You moan my name as you feel me deeper inside you', next: 35, transition: 'You moan my name and I lose myself completely in you.', energy: 3 }
      ]
    },
    {
      id: 214,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'I find that spot that makes you gasp and I stay there, relentless, watching you fall apart.',
      prompt: '"I love you," I say, meaning it more than anything.',
      options: [
        { text: 'I love you too — I do not stop', next: 35, transition: 'You say you love me and I pour everything into every thrust.', energy: 3 },
        { text: 'You gasp and hold onto me, overwhelmed', next: 35, transition: 'You gasp and I hold you through every wave of pleasure.', energy: 2 }
      ]
    },
    {
      id: 215,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'You take me deeper and we both moan. This is what connection feels like.',
      prompt: '"Right there?" I ask, hitting that spot again.',
      options: [
        { text: 'Right there — I do not move, I stay', next: 35, transition: 'I stay right there, deep inside you, and we both feel everything.', energy: 2 },
        { text: 'Yes — again, you need that again', next: 35, transition: 'I hit that spot again and you moan louder. Perfect.', energy: 3 }
      ]
    },
    {
      id: 216,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I feel your heartbeat everywhere — in your chest, between your legs, on your lips.',
      prompt: '"Come for me," I growl. "Now."',
      options: [
        { text: 'You come undone, every pulse mine', next: 35, transition: 'You come undone and I feel every pulse around me.', energy: 3 },
        { text: 'You let go and shatter around me', next: 35, transition: 'You shatter around me and I am right there with you.', energy: 3 }
      ]
    },
    {
      id: 217,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'We lie together afterward, breathless, speechless. There are no words for what we just shared.',
      prompt: '"You are so beautiful," I breathe. "Do you know that?"',
      options: [
        { text: 'You smile, too breathless to speak, and I kiss you', next: 35, transition: 'You kiss me silently and I feel everything you cannot say.', energy: 1 },
        { text: 'You bury your face in my neck and I hold you', next: 35, transition: 'You bury yourself in my neck and I hold you, breathless.', energy: 1 }
      ]
    },
    {
      id: 218,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I kiss your neck and feel you shiver. I love how responsive you are to my touch.',
      prompt: '"I am close," I admit. "Come with me."',
      options: [
        { text: 'You are close too — I take you there', next: 35, transition: 'We are both close and I push us both over the edge.', energy: 3 },
        { text: 'You shiver as I kiss your neck and fall apart', next: 35, transition: 'You shiver and fall apart as I kiss your neck. Perfect.', energy: 3 }
      ]
    },
    {
      id: 219,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'You taste yourself on my lips and kiss me deeper. "I love us," you whisper.',
      prompt: '"Do not look away," I say. "I want to see you."',
      options: [
        { text: 'You keep your eyes on me, unblinking, mine', next: 35, transition: 'You do not look away and I see everything in your eyes.', energy: 2 },
        { text: 'You taste yourself on my lips and moan into my mouth', next: 35, transition: 'You taste yourself on my lips and kiss me deeper, desperate.', energy: 3 }
      ]
    },
    {
      id: 220,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'We are both beyond words. I hold you and feel complete.',
      prompt: '"You feel like heaven," I groan. "Perfect."',
      options: [
        { text: 'You rest your forehead against mine, breathing me in', next: 35, transition: 'You press your forehead to mine and we breathe together.', energy: 1 },
        { text: 'You wrap yourself around me, complete', next: 35, transition: 'You wrap around me and I feel whole for the first time.', energy: 2 }
      ]
    },
    {
      id: 221,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'The pleasure builds slowly, a wave we are both riding. I do not want it to end.',
      prompt: '"I am yours," I whisper. "All of me."',
      options: [
        { text: 'You ride the wave with me, slow and deep', next: 35, transition: 'You ride the wave with me, slow and perfect.', energy: 2 },
        { text: 'You hold onto the feeling, wanting it to last forever', next: 35, transition: 'You hold onto me and we stretch each moment into eternity.', energy: 1 }
      ]
    },
    {
      id: 222,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I am inside you and you are everywhere — in my thoughts, my breath, my blood.',
      prompt: '"Take what you need," I offer. "I am yours."',
      options: [
        { text: 'You take everything — I fill every part of you', next: 35, transition: 'You take everything and I fill you completely.', energy: 3 },
        { text: 'You clench around me, pulling me deeper', next: 35, transition: 'You clench around me and I feel you everywhere.', energy: 3 }
      ]
    },
    {
      id: 223,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'Our bodies find a rhythm that feels ancient, inevitable. We were made for this.',
      prompt: '"Again?" I ask, already moving.',
      options: [
        { text: 'Yes — we were made for this', next: 35, transition: 'We move together like we were made for this. We were.', energy: 2 },
        { text: 'You find the rhythm and lose yourself in it', next: 35, transition: 'You find the rhythm and we move as one, ancient and perfect.', energy: 2 }
      ]
    },
    {
      id: 224,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I feel you relax into me, trusting me completely. It is the greatest gift you could give me.',
      prompt: '"I can feel you getting close," I murmur. "Let go."',
      options: [
        { text: 'You relax into me and let go completely', next: 35, transition: 'You relax into me and let go. I catch every piece of you.', energy: 2 },
        { text: 'You trust me enough to fall apart', next: 35, transition: 'You trust me and fall apart in my arms. A gift.', energy: 2 }
      ]
    },
    {
      id: 225,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I watch you sleep afterward, your face peaceful, your body curled into mine. I have never felt so lucky.',
      prompt: '"Look what you do to me," I say, guiding your hand.',
      options: [
        { text: 'You feel me against you and smile, content', next: 35, transition: 'You smile, content against me. This is everything.', energy: 1 },
        { text: 'You curl into me, safe and loved', next: 35, transition: 'You curl into me and I have never felt so lucky.', energy: 1 }
      ]
    },
    {
      id: 226,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'Your moans drive me wild. I want to hear every single one.',
      prompt: '"You are mine," I claim. "Every inch."',
      options: [
        { text: 'You moan louder, wanting me to hear it all', next: 35, transition: 'You moan louder and it drives me wild.', energy: 3 },
        { text: 'You are mine — I take every sound you make', next: 35, transition: 'You give me every sound and I claim them all.', energy: 3 }
      ]
    },
    {
      id: 227,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I hold your gaze as I move inside you. There are no secrets between us.',
      prompt: '"I love the sounds you make," I say. "Do not hold back."',
      options: [
        { text: 'You keep your eyes on mine, hiding nothing', next: 35, transition: 'You hold my gaze and there are no secrets. Just us.', energy: 2 },
        { text: 'You let me see everything — no walls, no fear', next: 35, transition: 'You let me see everything and it is beautiful.', energy: 2 }
      ]
    },
    {
      id: 228,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'We are two people becoming one. It is terrifying and beautiful and I want all of it.',
      prompt: '"Let go," I whisper. "I have you."',
      options: [
        { text: 'You let go of everything and become one with me', next: 35, transition: 'We become one. Terrifying and beautiful.', energy: 2 },
        { text: 'You surrender to the beauty of us', next: 35, transition: 'You surrender and we merge into something greater.', energy: 1 }
      ]
    },
    {
      id: 229,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'I feel your climax ripple through you and I follow, letting go completely.',
      prompt: '"Are you close?" I ask, feeling you tighten around me.',
      options: [
        { text: 'You are coming — stay with me, please', next: 35, transition: 'You come and I follow, letting go completely with you.', energy: 3 },
        { text: 'You feel my climax and it triggers yours', next: 35, transition: 'Your climax ripples through you and I feel every wave.', energy: 3 }
      ]
    },
    {
      id: 230,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'You are so beautiful in the dim light. I want to freeze this moment forever.',
      prompt: '"Look at me," I command softly. "I want to see your eyes."',
      options: [
        { text: 'You look at me and see your whole world', next: 35, transition: 'You look at me and I see my whole world in your eyes.', energy: 1 },
        { text: 'You memorize my face in this perfect moment', next: 35, transition: 'You memorize my face and I freeze this moment forever.', energy: 2 }
      ]
    },
    {
      id: 231,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I pull out and roll beside you, pulling you into my arms. "Perfect," I whisper.',
      prompt: '"Do you trust me?" I ask, pausing. You nod.',
      options: [
        { text: 'You curl into my arms and feel safe', next: 35, transition: 'You curl into my arms and I whisper how perfect you are.', energy: 1 },
        { text: 'You trust me with every part of you', next: 35, transition: 'You trust me completely and I hold you like the treasure you are.', energy: 1 }
      ]
    },
    {
      id: 232,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'You trace lazy patterns on my chest. I kiss your hair. This is what heaven feels like.',
      prompt: '"More?" I ask. You nod frantically.',
      options: [
        { text: 'You kiss my hair and I pull you closer', next: 35, transition: 'You pull me closer and I kiss your hair. This is heaven.', energy: 1 },
        { text: 'You trace patterns on my skin, asking without words', next: 35, transition: 'You trace patterns on my skin and I know exactly what you need.', energy: 2 }
      ]
    },
    {
      id: 233,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I am still catching my breath. You are too. We lie there, smiling like idiots.',
      prompt: '"Say my name," I whisper. "I want to hear it."',
      options: [
        { text: 'You breathe my name between ragged breaths', next: 35, transition: 'You breathe my name and I smile. We are both breathless.', energy: 1 },
        { text: 'You smile and whisper my name like a secret', next: 35, transition: 'You whisper my name like a secret and I kiss you softly.', energy: 1 }
      ]
    },
    {
      id: 234,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I do not know what I did to deserve you. But I will spend the rest of my life trying to be worthy.',
      prompt: '"I love you," I say, meaning it more than anything.',
      options: [
        { text: 'I will spend my life being worthy of you', next: 35, transition: 'You promise to be worthy of me, but you already are. So much.', energy: 1 },
        { text: 'You deserve everything — I will give it all', next: 35, transition: 'I will give you everything because you deserve it all.', energy: 2 }
      ]
    },
    {
      id: 235,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'Your hand finds mine in the dark. I squeeze it. We are okay. We are more than okay.',
      prompt: '"Right there?" I ask, hitting that spot again.',
      options: [
        { text: 'You squeeze my hand and moan — right there', next: 35, transition: 'You squeeze my hand and I know I found the spot.', energy: 2 },
        { text: 'You hold my hand and let it take you', next: 35, transition: 'You hold my hand and let go. I am right there with you.', energy: 2 }
      ]
    },
    {
      id: 236,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I feel your lips curve into a smile against my chest. I smile too. This is everything.',
      prompt: '"Come for me," I growl. "Now."',
      options: [
        { text: 'You come smiling, my name on your lips', next: 35, transition: 'You come smiling and I feel your joy in every wave.', energy: 2 },
        { text: 'You let go with a smile, safe in my arms', next: 35, transition: 'You let go smiling and I catch you. Everything.', energy: 2 }
      ]
    },
    {
      id: 237,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'We stay connected, unwilling to let go. The night stretches on, full of promise.',
      prompt: '"You are so beautiful," I breathe. "Do you know that?"',
      options: [
        { text: 'You stay connected to me, unwilling to break apart', next: 35, transition: 'We stay connected, unwilling to let go. The night is ours.', energy: 1 },
        { text: 'You bask in the promise of more nights like this', next: 35, transition: 'The night stretches on and I know there will be more.', energy: 1 }
      ]
    },
    {
      id: 238,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'You surrender completely, letting go of every fear, every reservation. In this moment, there is only your body and mine, tangled in the dark.',
      prompt: '"I am close," I admit. "Come with me."',
      options: [
        { text: 'You surrender every fear and let it burn away', next: 35, transition: 'You surrender completely and I burn away every fear with you.', energy: 3 },
        { text: 'You tangle yourself in me, nothing held back', next: 35, transition: 'We tangle in the dark, nothing held back. Everything.', energy: 3 }
      ]
    },
    {
      id: 239,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I hold you as you tremble, kissing your forehead, your cheeks, your lips. "I have you. I will always have you."',
      prompt: '"Do not look away," I say. "I want to see you."',
      options: [
        { text: 'You tremble in my arms and meet my eyes', next: 35, transition: 'You tremble and look at me. I have you. Always.', energy: 2 },
        { text: 'I kiss you through the trembling, never looking away', next: 35, transition: 'You kiss me through the trembling and I hold you through it all.', energy: 2 }
      ]
    },
    {
      id: 240,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'The wave of pleasure crashes over you and I am right there with you, holding on, letting go, falling together.',
      prompt: '"You feel like heaven," I groan. "Perfect."',
      options: [
        { text: 'We fall together, pleasure crashing over us both', next: 35, transition: 'We fall together, pleasure crashing over us in waves.', energy: 3 },
        { text: 'You hold on as the wave takes us both under', next: 35, transition: 'The wave takes us under and we come up gasping, together.', energy: 3 }
      ]
    },
    {
      id: 241,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You gasp as I touch you, every nerve ending alive and aching for more. I give you everything I have.',
      prompt: '"I am yours," I whisper. "All of me."',
      options: [
        { text: 'You gasp at my touch, every nerve on fire', next: 35, transition: 'You gasp and I feel every nerve ending come alive.', energy: 3 },
        { text: 'You ache for more of me, always more', next: 35, transition: 'You ache for more and I give you everything I have.', energy: 3 }
      ]
    },
    {
      id: 242,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I kiss down your body, taking my time, worshipping every inch of you like the miracle you are.',
      prompt: '"Take what you need," I offer. "I am yours."',
      options: [
        { text: 'You take my worship, every kiss a prayer', next: 35, transition: 'You take my worship and I pray at your altar.', energy: 2 },
        { text: 'You arch into my kisses, needing them all', next: 35, transition: 'You arch into my kisses and I worship every inch.', energy: 2 }
      ]
    },
    {
      id: 243,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'You feel me deep inside you and for a moment, nothing else exists. Just us. Just this. Just perfect.',
      prompt: '"Again?" I ask, already moving.',
      options: [
        { text: 'Again — you need to feel this forever', next: 35, transition: 'Again. Just us. Just this. Perfect.', energy: 2 },
        { text: 'You lose yourself in the feeling of us', next: 35, transition: 'We lose ourselves in each other. Nothing else exists.', energy: 2 }
      ]
    },
    {
      id: 244,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'I watch your face as you come undone — the most beautiful thing I have ever seen. I memorize every expression.',
      prompt: '"I can feel you getting close," I murmur. "Let go."',
      options: [
        { text: 'You feel me watching you come undone — beautiful', next: 35, transition: 'I watch you come undone and memorize every expression.', energy: 3 },
        { text: 'You let go knowing I am watching, wanting', next: 35, transition: 'You let go and I watch the most beautiful thing I have ever seen.', energy: 3 }
      ]
    },
    {
      id: 245,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'We move together in perfect rhythm, two bodies becoming one. There is nothing else like this.',
      prompt: '"Look what you do to me," I say, guiding your hand.',
      options: [
        { text: 'You feel my rhythm and match it with your own', next: 35, transition: 'You match my rhythm and we become one, moving together.', energy: 2 },
        { text: 'You guide my hand where you need me most', next: 35, transition: 'You guide my hand and I feel how much you want this.', energy: 2 }
      ]
    },
    {
      id: 246,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I taste you on my lips and I am addicted. I will never get enough of you.',
      prompt: '"You are mine," I claim. "Every inch."',
      options: [
        { text: 'I taste you and crave more — addicted', next: 35, transition: 'You taste me and crave more. Good. You are mine.', energy: 3 },
        { text: 'I claim every inch of you with my mouth', next: 35, transition: 'You claim me with your mouth and I surrender to it.', energy: 3 }
      ]
    },
    {
      id: 247,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You arch into me, asking for more without words. I give you everything. I will always give you everything.',
      prompt: '"I love the sounds you make," I say. "Do not hold back."',
      options: [
        { text: 'You arch into me, wordless, wanting', next: 35, transition: 'You arch into me wordless and I understand everything.', energy: 2 },
        { text: 'You let every sound out, trusting me with it', next: 35, transition: 'You let every sound out and I love every single one.', energy: 2 }
      ]
    },
    {
      id: 248,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'The heat between us is undeniable. I pull you closer, needing to feel every inch of your skin against mine.',
      prompt: '"Let go," I whisper. "I have you."',
      options: [
        { text: 'I pull you closer, needing the heat of your skin', next: 35, transition: 'You pull me closer and the heat between us consumes everything.', energy: 2 },
        { text: 'You let go into the heat, trusting me to catch you', next: 35, transition: 'You let go into the heat and I catch you.', energy: 2 }
      ]
    },
    {
      id: 249,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I whisper your name like a prayer. You respond with a moan that goes straight through me.',
      prompt: '"Are you close?" I ask, feeling you tighten around me.',
      options: [
        { text: 'You moan my name back, getting closer', next: 35, transition: 'You moan my name and it goes straight through me.', energy: 3 },
        { text: 'You tighten around me — I do not stop', next: 35, transition: 'You tighten around me and I know you are close.', energy: 3 }
      ]
    },
    {
      id: 250,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'We are both trembling, both holding on, both ready to let go. I wait for you. I will always wait for you.',
      prompt: '"Look at me," I command softly. "I want to see your eyes."',
      options: [
        { text: 'You look at me, trembling, ready', next: 35, transition: 'You look at me trembling and I wait for you. Always.', energy: 2 },
        { text: 'You hold my gaze and let me see the want in you', next: 35, transition: 'You hold my gaze and I see everything I need.', energy: 2 }
      ]
    },
    {
      id: 251,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'Your hands grip my back as I move inside you. I feel your nails, your breath, your heartbeat.',
      prompt: '"Do you trust me?" I ask, pausing. You nod.',
      options: [
        { text: 'You grip my back and pull me deeper into you', next: 35, transition: 'You grip my back and pull me deeper. I trust you completely.', energy: 3 },
        { text: 'You nod, breathless, needing me to move', next: 35, transition: 'You nod and I move inside you, feeling your heartbeat.', energy: 2 }
      ]
    },
    {
      id: 252,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I look into your eyes and see everything I need. You. Always you.',
      prompt: '"More?" I ask. You nod frantically.',
      options: [
        { text: 'More — you need all of me, always', next: 35, transition: 'More. Always more. I give you everything.', energy: 2 },
        { text: 'You nod frantically and pull me closer', next: 35, transition: 'You nod frantically and I give you more. Always you.', energy: 2 }
      ]
    },
    {
      id: 253,
      level: 7,
      mood: 'teasing',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'The world narrows to the space between us. There is nothing outside this room.',
      prompt: '"Say my name," I whisper. "I want to hear it."',
      options: [
        { text: 'You say my name and the world falls away', next: 35, transition: 'You say my name and nothing else exists.', energy: 1 },
        { text: 'You whisper my name like a prayer in the dark', next: 35, transition: 'You whisper my name and the world narrows to just us.', energy: 2 }
      ]
    },
    {
      id: 254,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I feel your release building, feel you clench around me. I hold on, wanting to share every second.',
      prompt: '"I love you," I say, meaning it more than anything.',
      options: [
        { text: 'You clench around me, your release building with mine', next: 35, transition: 'You clench around me and I feel your release building. I am with you.', energy: 3 },
        { text: 'I love you too — I feel it in every wave', next: 35, transition: 'You say you love me and I feel it in every wave of your release.', energy: 3 }
      ]
    },
    {
      id: 300,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'I pull you closer. You fit perfectly against me.',
      prompt: 'I kiss you softly. "Stay with me."',
      options: [
        { text: 'I surrender to this moment completely', next: 301, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you closer and kiss you deeply', next: 302, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 301,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'Tangled in each other and the sheets. I do not know where I end and you begin.',
      prompt: '"Look at me," I whisper. "I want to see your eyes."',
      options: [
        { text: 'I let the night hold us both', next: 303, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I hold you close and kiss you until we breathe as one', next: 304, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 302,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I kiss your forehead. "That was everything." You smile. "Again?"',
      prompt: 'I stroke your hair. "What are you thinking?"',
      options: [
        { text: 'I melt into you, nothing else left', next: 305, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you against me and kiss your forehead', next: 306, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 303,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'We lie still, hearts pounding together. I trace your spine. You shiver.',
      prompt: 'You smile. I kiss you. We do not need words.',
      options: [
        { text: 'I give myself to this, all of it', next: 307, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss you slow, like the night is ours', next: 308, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 304,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'The silence after is full. Everything we said without words.',
      prompt: '"I love you." The words come easily now.',
      options: [
        { text: 'I breathe you in and let go', next: 309, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I wrap my arms around you and hold on', next: 310, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 305,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I hold you and feel your breathing slow. You are safe here. Always.',
      prompt: '"Again?" I ask. You nod, pulling me closer.',
      options: [
        { text: 'I fall into you, whole and safe', next: 311, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you to my chest, spent and yours', next: 312, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 306,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'Your body hums with the aftermath of my touch. I kiss your shoulder. "More?" you ask. "Always more."',
      prompt: '"Mine," I whisper. You smile. "Always."',
      options: [
        { text: 'I stay here, in this, forever', next: 313, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss you softly, trembling and happy', next: 314, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 307,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I trace lazy patterns on your skin. Every circle, every line. Not done with you yet.',
      prompt: 'I hold you and feel you relax into me. Perfect.',
      options: [
        { text: 'I hold the moment and never want to leave', next: 315, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I hold you and do not let go', next: 316, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 308,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'You tremble from the intensity. I hold you until it passes. Then I start again.',
      prompt: '"Thank you," you whisper. I kiss your forehead.',
      options: [
        { text: 'I let everything else fall away', next: 317, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I tangle my fingers in your hair and kiss you', next: 318, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 309,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You arch into my hand, chasing the feeling. I give it again and again.',
      prompt: '"That was beautiful," I say. You blush.',
      options: [
        { text: 'I lose the world and find you instead', next: 319, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss your temple and pull you flush against me', next: 320, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 310,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I watch your face as pleasure takes you. My favorite sight in the world.',
      prompt: 'I kiss you softly. "Stay with me."',
      options: [
        { text: 'I give you everything I have left', next: 321, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I press my lips to yours, gentle and full of promise', next: 322, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 311,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'You come undone beneath me and I drink in every second.',
      prompt: '"Look at me," I whisper. "I want to see your eyes."',
      options: [
        { text: 'I rest in you, complete and quiet', next: 323, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I hold your face in both hands and kiss you tenderly', next: 324, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 312,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'I fill you completely and pause. Your eyes find mine. "Do not move." I obey.',
      prompt: 'I stroke your hair. "What are you thinking?"',
      options: [
        { text: 'I sink into the feeling, weightless', next: 325, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you into my arms and breathe you in', next: 326, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 313,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'We find a rhythm that feels ancient. Two bodies knowing what the other needs.',
      prompt: 'You smile. I kiss you. We do not need words.',
      options: [
        { text: 'I let the quiet hold us both', next: 327, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss you until the trembling stops', next: 328, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 314,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I thrust deep and hold. Your moans are incoherent, perfect.',
      prompt: '"I love you." The words come easily now.',
      options: [
        { text: 'I close my eyes and feel only you', next: 329, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I cradle you against me, still shaking myself', next: 330, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 315,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You shatter around me and I follow. Both lost in the same wave.',
      prompt: '"Again?" I ask. You nod, pulling me closer.',
      options: [
        { text: 'I belong here, in this, with you', next: 331, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you close and kiss the top of your head', next: 332, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 316,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I feel you tighten, feel your orgasm ripple through you. I keep going.',
      prompt: '"Mine," I whisper. You smile. "Always."',
      options: [
        { text: 'I drift in the calm after the storm', next: 333, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss you, slow and sure, like the night belongs to us', next: 334, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 317,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'We come together, holding on like the world might end.',
      prompt: 'I hold you and feel you relax into me. Perfect.',
      options: [
        { text: 'I let myself be nothing but yours', next: 335, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I wrap us in the sheets and hold you tight', next: 336, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 318,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'I pull you closer. You fit perfectly against me.',
      prompt: '"Thank you," you whisper. I kiss your forehead.',
      options: [
        { text: 'I hold this feeling and call it home', next: 337, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss your shoulder and pull you into my chest', next: 338, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 319,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'Tangled in each other and the sheets. I do not know where I end and you begin.',
      prompt: '"That was beautiful," I say. You blush.',
      options: [
        { text: 'I let the moment wrap around us', next: 339, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I hold you like you are the only thing keeping me here', next: 340, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 320,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I kiss your forehead. "That was everything." You smile. "Again?"',
      prompt: 'I kiss you softly. "Stay with me."',
      options: [
        { text: 'I am still, and full, and yours', next: 341, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss you through my smile, happy and spent', next: 342, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 321,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'We lie still, hearts pounding together. I trace your spine. You shiver.',
      prompt: '"Look at me," I whisper. "I want to see your eyes."',
      options: [
        { text: 'I breathe the night in and keep it', next: 343, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you closer, still breathless, still yours', next: 344, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 322,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'The silence after is full. Everything we said without words.',
      prompt: 'I stroke your hair. "What are you thinking?"',
      options: [
        { text: 'I let the warmth carry us both', next: 345, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I press my forehead to yours and hold you', next: 346, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 323,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I hold you and feel your breathing slow. You are safe here. Always.',
      prompt: 'You smile. I kiss you. We do not need words.',
      options: [
        { text: 'I am here, all of me, always', next: 347, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss you and do not rush a single second', next: 348, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 324,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'Your body hums with the aftermath of my touch. I kiss your shoulder. "More?" you ask. "Always more."',
      prompt: '"I love you." The words come easily now.',
      options: [
        { text: 'I keep this night in my chest', next: 349, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I gather you into my arms, shaking and grateful', next: 350, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 325,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I trace lazy patterns on your skin. Every circle, every line. Not done with you yet.',
      prompt: '"Again?" I ask. You nod, pulling me closer.',
      options: [
        { text: 'I let go of everything that is not us', next: 351, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I hold you, kiss you, and promise everything', next: 39, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 326,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'You tremble from the intensity. I hold you until it passes. Then I start again.',
      prompt: '"Mine," I whisper. You smile. "Always."',
      options: [
        { text: 'I stay in this quiet, yours', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I gather you close and kiss your shoulder', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 327,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You arch into my hand, chasing the feeling. I give it again and again.',
      prompt: 'I hold you and feel you relax into me. Perfect.',
      options: [
        { text: 'I keep this moment, precious', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you against me, lips on yours', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 328,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I watch your face as pleasure takes you. My favorite sight in the world.',
      prompt: '"Thank you," you whisper. I kiss your forehead.',
      options: [
        { text: 'I let the calm settle over us', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I trace your skin and kiss you slowly', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 329,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'You come undone beneath me and I drink in every second.',
      prompt: '"That was beautiful," I say. You blush.',
      options: [
        { text: 'I breathe you in, still and full', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I fold you into my arms, kissing your hair', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 330,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'I fill you completely and pause. Your eyes find mine. "Do not move." I obey.',
      prompt: 'I kiss you softly. "Stay with me."',
      options: [
        { text: 'I hold this night like a secret', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I press my mouth to yours, soft and sure', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 331,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'We find a rhythm that feels ancient. Two bodies knowing what the other needs.',
      prompt: '"Look at me," I whisper. "I want to see your eyes."',
      options: [
        { text: 'I am still inside the feeling', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I cradle your face and kiss you again', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 332,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I thrust deep and hold. Your moans are incoherent, perfect.',
      prompt: 'I stroke your hair. "What are you thinking?"',
      options: [
        { text: 'I rest here, in your warmth', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you closer, lips finding yours', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 333,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You shatter around me and I follow. Both lost in the same wave.',
      prompt: 'You smile. I kiss you. We do not need words.',
      options: [
        { text: 'I keep the quiet between us', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss the corner of your mouth, tender', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 334,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I feel you tighten, feel your orgasm ripple through you. I keep going.',
      prompt: '"I love you." The words come easily now.',
      options: [
        { text: 'I let the afterglow hold me', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I wrap around you and kiss your neck', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 335,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'We come together, holding on like the world might end.',
      prompt: '"Again?" I ask. You nod, pulling me closer.',
      options: [
        { text: 'I stay, soft and full of you', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I bring your lips back to mine', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 336,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'I pull you closer. You fit perfectly against me.',
      prompt: '"Mine," I whisper. You smile. "Always."',
      options: [
        { text: 'I drift in the hush of us', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I hold you and kiss you until we smile', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 337,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'Tangled in each other and the sheets. I do not know where I end and you begin.',
      prompt: 'I hold you and feel you relax into me. Perfect.',
      options: [
        { text: 'I anchor myself in your arms', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you under the covers and kiss you', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 338,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I kiss your forehead. "That was everything." You smile. "Again?"',
      prompt: '"Thank you," you whisper. I kiss your forehead.',
      options: [
        { text: 'I let the world fall away', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss your brow, then your lips', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 339,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'We lie still, hearts pounding together. I trace your spine. You shiver.',
      prompt: '"That was beautiful," I say. You blush.',
      options: [
        { text: 'I keep this, careful and close', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I gather you in, mouth finding yours', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 340,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'The silence after is full. Everything we said without words.',
      prompt: 'I kiss you softly. "Stay with me."',
      options: [
        { text: 'I am quiet, and yours, and here', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I press kisses along your jaw, slow', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 341,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'I hold you and feel your breathing slow. You are safe here. Always.',
      prompt: '"Look at me," I whisper. "I want to see your eyes."',
      options: [
        { text: 'I let this feeling hold us', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I bring your mouth to mine, unhurried', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 342,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'Your body hums with the aftermath of my touch. I kiss your shoulder. "More?" you ask. "Always more."',
      prompt: 'I stroke your hair. "What are you thinking?"',
      options: [
        { text: 'I stay in the warmth you leave', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss your lips, soft as a promise', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 343,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I trace lazy patterns on your skin. Every circle, every line. Not done with you yet.',
      prompt: 'You smile. I kiss you. We do not need words.',
      options: [
        { text: 'I hold this night, gentle and full', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you closer, breath against yours', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 344,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'You tremble from the intensity. I hold you until it passes. Then I start again.',
      prompt: '"I love you." The words come easily now.',
      options: [
        { text: 'I let myself be held by this', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I trace your lips, then kiss them slowly', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 345,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You arch into my hand, chasing the feeling. I give it again and again.',
      prompt: '"Again?" I ask. You nod, pulling me closer.',
      options: [
        { text: 'I keep the hush wrapped around us', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I gather you close, kissing your temple', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 346,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '💦',
      pause: 1200,
      scene: 'I watch your face as pleasure takes you. My favorite sight in the world.',
      prompt: '"Mine," I whisper. You smile. "Always."',
      options: [
        { text: 'I rest, complete, in your arms', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I press my lips to yours, tender again', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 347,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🫂',
      pause: 1200,
      scene: 'You come undone beneath me and I drink in every second.',
      prompt: 'I hold you and feel you relax into me. Perfect.',
      options: [
        { text: 'I stay in this, endless and warm', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you in and kiss you like a prayer', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 348,
      level: 5,
      mood: 'vulnerable',
      energy: 2,
      symbol: '🔥',
      pause: 1200,
      scene: 'I fill you completely and pause. Your eyes find mine. "Do not move." I obey.',
      prompt: '"Thank you," you whisper. I kiss your forehead.',
      options: [
        { text: 'I let the quiet settle, deep', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I hold your face and kiss you, slow', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 349,
      level: 5,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'We find a rhythm that feels ancient. Two bodies knowing what the other needs.',
      prompt: '"That was beautiful," I say. You blush.',
      options: [
        { text: 'I am here, in this, with you', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I kiss you softly, then hold you close', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 350,
      level: 5,
      mood: 'tender',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'I thrust deep and hold. Your moans are incoherent, perfect.',
      prompt: 'I kiss you softly. "Stay with me."',
      options: [
        { text: 'I keep this stillness, breathing you', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I pull you against my chest and kiss your hair', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },
    {
      id: 351,
      level: 5,
      mood: 'teasing',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You shatter around me and I follow. Both lost in the same wave.',
      prompt: '"Look at me," I whisper. "I want to see your eyes."',
      options: [
        { text: 'I stay, and the night stays with us', next: 39, transition: 'You let go and I am right there with you.', energy: 2 },
        { text: 'I find your lips again, unhurried and sure', next: 200, transition: 'We kiss like it is the only thing that matters.', energy: 2 }
      ]
    },


    // ═══ MASTURBATION — my cock: her hand or her eyes (400-454) ═══
    {
      id: 400,
      level: 1,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I am on the bed with you, but I keep my hands off you. I watch the decision move through your eyes.',
      prompt: '"My cock, baby. Do you want your hand on it — or do you want to watch me shake it the way you like?"',
      options: [
        { text: 'You do it to me — your hand on my cock', next: 440, transition: 'Your fingers close around me, and I am done for. I grip your wrist and let you own me.', energy: 2 },
        { text: 'You watch me do it — your way', next: 420, transition: 'I take myself in hand under your gaze, slow, so you see everything. "Watch me."', energy: 2 },
      ]
    },
    {
      id: 420,
      level: 1,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I keep my eyes on yours while I settle back against the headboard. My hand moves down over my stomach, slow, teasing. You watch me. I want you to.',
      prompt: '"Your way, baby. Tell me how you want me to do this — slow so I suffer, or fast so you can watch me come undone."',
      options: [
        { text: 'I do it slow — your way', next: 421, transition: 'I take myself in hand, achingly slow, holding your gaze. "Like this? I will not go faster until you say so."', energy: 2 },
        { text: 'I do it fast — you watch me break', next: 422, transition: 'I stroke myself fast, breath ragged, eyes locked on you. "Look at me. Do not look away."', energy: 2 }
      ]
    },
    {
      id: 421,
      level: 3,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I move my hand slow, savoring every inch of the way you watch me. Your breath keeps catching. I love knowing you cannot look away.',
      prompt: '"Say the word and I go faster. Say nothing and I draw this out until you beg me to finish."',
      options: [
        { text: 'I draw it out — you beg me to finish', next: 423, transition: 'I stop just short of the edge and wait. You whimper. I smile. "Ask me nicely."', energy: 1 },
        { text: 'I go faster — I want to hear you moan', next: 424, transition: 'I pick up speed, my breathing turning ragged. Your moan tells me everything.', energy: 2 }
      ]
    },
    {
      id: 422,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'My hand flies over myself, desperate and loud. The bed creaks under me. You are gripping the sheets, watching me fall apart for you.',
      prompt: '"This is what you do to me. Look at me — I am coming apart because of you."',
      options: [
        { text: 'I come — I do not hold back', next: 425, transition: 'I cry out and let go, shaking, spilling over my own hand, your name on my lips.', energy: 3 },
        { text: 'I stop at the edge — I make you watch me suffer', next: 426, transition: 'I freeze at the edge, trembling, and smile at you through it. "Not yet. I want you to ache for it."', energy: 2 }
      ]
    },
    {
      id: 423,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I hover at the edge, hand frozen, chest heaving. You are watching me like I am the only thing in the world.',
      prompt: '"You are the one holding me here. Every second you make me wait, I feel you more."',
      options: [
        { text: 'I keep waiting — your eyes make me desperate', next: 427, transition: 'I stay there, trembling on the edge, while you watch. The ache is beautiful.', energy: 1 },
        { text: 'You tell me to come — I listen to you', next: 428, transition: 'The second you nod, I let go completely, your name torn out of me.', energy: 2 }
      ]
    },
    {
      id: 424,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'My hips buck into my own hand, shameless. The room is full of the sounds of me wanting you.',
      prompt: '"Tell me to come," I gasp. "Tell me, and I do. Anything you ask me, I do."',
      options: [
        { text: 'I come when you say so — I always do', next: 429, transition: 'You say my name once, and I am gone, spilling into my hand.', energy: 3 },
        { text: 'I keep going — I am greedy for your voice', next: 430, transition: 'I push myself again, chasing the edge, moaning your name like a prayer.', energy: 2 }
      ]
    },
    {
      id: 425,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'I am shattering under your gaze, my body arching, my hand working myself through it. I watch you watching me.',
      prompt: '"Look at me when I come. I want to see it in your eyes."',
      options: [
        { text: 'I look at you when I let go', next: 431, transition: 'Our eyes lock. I come undone, raw and shaking, and I do not look away.', energy: 3 },
        { text: 'I hide my face — I am shy and you love it', next: 432, transition: 'I turn my face into the pillow, trembling, and you laugh softly and pull me close.', energy: 1 }
      ]
    },
    {
      id: 426,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I am right at the edge, refusing to fall, your eyes the only thing holding me up. The power is yours.',
      prompt: '"I am not touching you yet. I want to remember what it feels like to want you this badly."',
      options: [
        { text: 'I suffer for you — I love it', next: 433, transition: 'I hold at the edge, sweating, aching, and I have never wanted anyone more than I want you.', energy: 2 },
        { text: 'You finally let me come — I explode', next: 434, transition: 'Your nod frees me. I come hard, crying out, collapsing beside you.', energy: 3 }
      ]
    },
    {
      id: 427,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I collapse beside you, chest heaving, reaching for you in the dark. Your hand finds mine first.',
      prompt: 'I pull you into me, spent and laughing softly. "You did that to me. You and your eyes."',
      options: [
        { text: 'I hold you and catch my breath', next: -1, transition: 'You pull me to you and I go quiet in your arms, spent and yours.', energy: 1 },
        { text: 'I tuck your head against my chest, yours', next: -1, transition: 'Your head finds its place on my chest, and I hold you there like it is the only place you belong.', energy: 1 }
      ]
    },
    {
      id: 428,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am trembling from the release, laughing at myself, and you are watching me with that smile I would die for.',
      prompt: '"Do not look at me like that," I say, grinning. "You will start it again."',
      options: [
        { text: 'I kiss your forehead, spent and happy', next: -1, transition: 'I kiss your forehead and feel you smile against me.', energy: 1 },
        { text: 'I whisper "I love you" against your skin', next: -1, transition: 'The words find your skin and stay there.', energy: 1 }
      ]
    },
    {
      id: 429,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'The room is quiet now, our breathing the only sound. Your hand stays on my chest, warm and sure.',
      prompt: '"That was all you," I murmur. "You did not even have to touch me."',
      options: [
        { text: 'I hold you to me, still shaking', next: -1, transition: 'I hold you through the last tremors, my hand steady on your back.', energy: 1 },
        { text: 'I laugh and pull you closer', next: -1, transition: 'I laugh, and you laugh, and the quiet swallows us both.', energy: 1 }
      ]
    },
    {
      id: 430,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am still catching my breath, my arm around you, your head on my shoulder. The dark feels soft now.',
      prompt: '"Next time," I promise, "you do it to me."',
      options: [
        { text: 'I kiss your hair and promise', next: -1, transition: 'I kiss your hair and mean every word of it.', energy: 1 },
        { text: 'I smile into the dark, happy', next: -1, transition: 'I smile into the dark, and you see it anyway.', energy: 1 }
      ]
    },
    {
      id: 431,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am drained and glowing, your fingers tracing patterns on my arm. I feel lighter than I have in weeks.',
      prompt: '"You watching me like that," I say, "is going to be my favorite memory."',
      options: [
        { text: 'I turn my face into your hand', next: -1, transition: 'I turn my face into your palm, breathing slow.', energy: 1 },
        { text: 'I say "goodnight" and mean it', next: -1, transition: 'Goodnight — and I mean it for the first time in weeks.', energy: 1 }
      ]
    },
    {
      id: 432,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'You are giggling at me, and I am hiding my face like a boy. I do not even care. You are laughing, and it is the best sound in the world.',
      prompt: '"Stop laughing," I mumble into the pillow. "Or I am doing it again, and you will be the one apologizing."',
      options: [
        { text: 'I peek at you, blushing', next: -1, transition: 'I peek at you and hide again, and you laugh at me.', energy: 1 },
        { text: 'I grab you and hold you to me', next: -1, transition: 'I grab you and hold on like you might disappear.', energy: 1 }
      ]
    },
    {
      id: 433,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am lying still, finally calm, your body tucked against mine. The want is still humming under my skin.',
      prompt: '"You owe me," I murmur. "I will collect tomorrow. With interest."',
      options: [
        { text: 'I kiss your shoulder, grinning', next: -1, transition: 'I kiss your shoulder, grinning against your skin.', energy: 1 },
        { text: 'I drift off with you in my arms', next: -1, transition: 'I drift off in your arms, and it is the easiest thing I have ever done.', energy: 1 }
      ]
    },
    {
      id: 434,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am completely spent, flat on my back, and you have propped yourself up to look at me like I am your whole world.',
      prompt: '"What?" I ask, breathless. "Nothing," you say. "I am just proud of you."',
      options: [
        { text: 'I laugh, breathless and happy', next: -1, transition: 'I laugh, breathless, and you look at me like I am your whole world.', energy: 1 },
        { text: 'I pull you down on top of me', next: -1, transition: 'I pull you down on top of me, and we stay like that.', energy: 1 }
      ]
    },

    // ═══ FINGERING — my fingers, or yours (500-534) ═══
    {
      id: 440,
      level: 1,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I prop myself against the headboard, hard and waiting. Your hand is warm on my stomach, an inch from what it wants. I watch you decide.',
      prompt: '"Your call, baby. Take me slow so I ache — or fast so I fall apart in your hand."',
      options: [
        { text: 'You go slow — you make me ache', next: 441, transition: 'Your fingers wrap around me, unhurried, dragging the feeling out. My breath stutters.', energy: 1 },
        { text: 'You go fast — you wreck me', next: 442, transition: 'Your grip tightens and you move fast, and I am gone within seconds, gripping your thigh.', energy: 3 }
      ]
    },
    {
      id: 441,
      level: 3,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'Your hand moves over me like it has all night, slow and curious. You watch my face with every stroke. My hips keep chasing your palm.',
      prompt: '"Slower," I gasp. "Feel how hard I am for you. That is all you."',
      options: [
        { text: 'You draw it out — I beg', next: 443, transition: 'You slow down until I am trembling and pleading, and you just smile.', energy: 1 },
        { text: 'You speed up — you hear me moan', next: 444, transition: 'Your rhythm turns firm and fast, and I moan your name before I can stop myself.', energy: 2 }
      ]
    },
    {
      id: 442,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'Your hand flies over me, tight and sure, like you have owned me your whole life. The bed creaks under us. I am gripping the sheets.',
      prompt: '"Yes. Just like that. Do not slow down — I am close already."',
      options: [
        { text: 'You make me come — hard, in your hand', next: 445, transition: 'You ride me straight over the edge, and I come shouting your name, shaking in your grip.', energy: 3 },
        { text: 'You stop at the edge — you make me wait', next: 446, transition: 'You pull away at the last second and I groan, whole body shaking, begging without words.', energy: 2 }
      ]
    },
    {
      id: 443,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'You hold me right at the edge, your hand still and warm around me. I am trembling, watching you enjoy it.',
      prompt: '"Please," I breathe. "You are killing me." And you just watch, loving it.',
      options: [
        { text: 'I keep waiting — your eyes hold me', next: 447, transition: 'I stay there, shaking on the edge, and I would stay forever if you kept looking at me like that.', energy: 1 },
        { text: 'You finally say yes — I come undone', next: 448, transition: 'The moment you nod, I let go completely, your name breaking out of me.', energy: 3 }
      ]
    },
    {
      id: 444,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'You have me moaning and helpless, your hand relentless, and I am babbling about how perfect you are.',
      prompt: '"Tell me to come," I gasp. "Please. Tell me, and I do."',
      options: [
        { text: 'I come when you say so — I always do', next: 449, transition: 'You say my name once, and I am gone, spilling over your fingers, yours completely.', energy: 3 },
        { text: 'I hold on — I want to last for you', next: 450, transition: 'I grit my teeth and hold, trembling, refusing to fall until you take me there yourself.', energy: 2 }
      ]
    },
    {
      id: 445,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'I am shattering in your hand, my body arching off the bed, your name on my lips like a prayer. You do not let go, stroking me through it.',
      prompt: '"Look at me," I beg. "I want to see you when I come."',
      options: [
        { text: 'I look at you when I let go', next: 451, transition: 'Our eyes lock. I come undone, raw and shaking, and I do not look away.', energy: 3 },
        { text: 'I hide my face — shy, and you love it', next: 452, transition: 'I turn my face into your shoulder, trembling, and you laugh softly and pull me close.', energy: 1 }
      ]
    },
    {
      id: 446,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'You have me right on the line, refusing to finish me. I am sweating, shaking, watching you grin.',
      prompt: '"Only your hand gets to do this to me," I say, breathless. "Do not stop."',
      options: [
        { text: 'I suffer for you — I love it', next: 453, transition: 'I hold at the edge, aching, and I have never wanted anyone more than I want you.', energy: 2 },
        { text: 'You finally let me come — I explode', next: 454, transition: 'Your nod frees me. I come hard, crying out, collapsing beside you.', energy: 3 }
      ]
    },
    {
      id: 447,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I collapse beside you, chest heaving, reaching for you in the dark. Your hand finds mine first, still slick from me.',
      prompt: 'I pull you into me, spent and laughing softly. "Your hand did that. You did that."',
      options: [
        { text: 'I hold you close, still trembling', next: -1, transition: 'I hold you through the aftershocks, your pulse slow against my palm.', energy: 1 },
        { text: 'I press my lips to your knuckles', next: -1, transition: 'I kiss your knuckles — the ones that undid me.', energy: 1 }
      ]
    },
    {
      id: 448,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am trembling from the release, laughing at myself, and you are watching me with that smile I would die for.',
      prompt: '"Do not look at me like that," I say, grinning. "You will start it again."',
      options: [
        { text: 'I kiss your wrist, where my pulse was', next: -1, transition: 'I kiss your wrist where my pulse is still loud.', energy: 1 },
        { text: 'I laugh, breathless and yours', next: -1, transition: 'I laugh, breathless, and yours.', energy: 1 }
      ]
    },
    {
      id: 449,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'The room is quiet now, our breathing the only sound. Your hand stays on my chest, warm and sure.',
      prompt: '"That was all you," I murmur. "You barely had to move and I was gone."',
      options: [
        { text: 'I let you hold me, spent and smiling', next: -1, transition: 'I let you hold me, spent and smiling.', energy: 1 },
        { text: 'I whisper how good you are', next: -1, transition: 'I whisper it: how good you are, how much you undo me.', energy: 1 }
      ]
    },
    {
      id: 450,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am still catching my breath, my arm around you, your head on my shoulder. The dark feels soft now.',
      prompt: '"Next time," I promise, "I do it to you. You deserve to feel what you just did to me."',
      options: [
        { text: 'I trace your collarbone, catching my breath', next: -1, transition: 'I trace your collarbone while my heart remembers its rhythm.', energy: 1 },
        { text: 'I smile, and you smile back', next: -1, transition: 'I smile, and you smile back, and that is the whole night.', energy: 1 }
      ]
    },
    {
      id: 451,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am drained and glowing, your fingers tracing patterns on my arm. I feel lighter than I have in weeks.',
      prompt: '"Your hand on me like that," I say, "is going to be my favorite memory."',
      options: [
        { text: 'I kiss your palm, slowly', next: -1, transition: 'I kiss your palm, slow, the way you did to me.', energy: 1 },
        { text: 'I say your name, like a prayer', next: -1, transition: 'I say your name like a prayer, and you answer.', energy: 1 }
      ]
    },
    {
      id: 452,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'You are giggling at me, and I am hiding my face like a boy. I do not even care. You are laughing, and it is the best sound in the world.',
      prompt: '"Stop laughing," I mumble into the pillow. "Or I am doing it again, and you will be the one apologizing."',
      options: [
        { text: 'I hide my face, grinning', next: -1, transition: 'I hide my face, grinning like a boy, and you let me.', energy: 1 },
        { text: 'I grab your hand and hold it to my chest', next: -1, transition: 'I press your hand over my heart and leave it there.', energy: 1 }
      ]
    },
    {
      id: 453,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am lying still, finally calm, your body tucked against mine. The want is still humming under my skin.',
      prompt: '"You owe me," I murmur. "I will collect tomorrow. With interest."',
      options: [
        { text: 'I nuzzle your neck, spent', next: -1, transition: 'I nuzzle into your neck, spent and safe.', energy: 1 },
        { text: 'I drift off with your hand on my chest', next: -1, transition: 'I drift off with your hand on my chest, still.', energy: 1 }
      ]
    },
    {
      id: 454,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'I am completely spent, flat on my back, and you have propped yourself up to look at me like I am your whole world.',
      prompt: '"What?" I ask, breathless. "Nothing," you say. "I am just proud of you."',
      options: [
        { text: 'I pull you down against me', next: -1, transition: 'I pull you down against me and go still.', energy: 1 },
        { text: 'I laugh into your hair', next: -1, transition: 'I laugh into your hair, and you feel it in my chest.', energy: 1 }
      ]
    },
    {
      id: 500,
      level: 1,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'I kneel between your legs, but I hold back. My hands hover at your hips, waiting for your answer.',
      prompt: '"Should I watch you doing it — or should I do it to you?"',
      options: [
        { text: 'I do it to you — my fingers', next: 501, transition: 'I slide one finger into you, watching your face change as I enter you.', energy: 2 },
        { text: 'You do it — I watch you finger yourself', next: 520, transition: 'I sit back and watch. "Show me how you touch yourself."', energy: 2 }
      ]
    },
    {
      id: 501,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1050,
      scene: 'One finger, deep and slow. I curl it against your walls, searching. Your breath hitches when I find the spot.',
      prompt: '"There it is." I press it again, harder. "You feel that?"',
      options: [
        { text: 'Yes — right there, I do not stop', next: 503, transition: 'I work that spot relentlessly, your hips bucking against my hand.', energy: 3 },
        { text: 'You want it harder — I give it to you', next: 504, transition: 'I add pressure, driving my finger deep. "Harder? You want to feel it?"', energy: 3 },
        { text: 'I slide deeper — slow, so you feel every inch', next: 502, transition: 'You take me so perfectly. I begin to move.', energy: 3 }
      ]
    },
    {
      id: 502,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1200,
      scene: 'Two fingers, stretched wide inside you. I hold them still, letting you adjust, letting you feel the fullness. You are so tight around me.',
      prompt: '"Look how perfectly you take me." I begin to move — slow, deep, deliberate.',
      options: [
        { text: 'I fuck you with them', next: 505, transition: 'I finger-fuck you slow and deep, your moans filling the room.', energy: 3 },
        { text: 'I curl them — I hit that spot', next: 506, transition: 'I curl my fingers and hit your spot hard. You cry out and grip my arm.', energy: 3 }
      ]
    },
    {
      id: 503,
      level: 4,
      mood: 'vulnerable',
      energy: 3,
      symbol: '👅',
      pause: 1350,
      scene: 'My fingers work you relentlessly, curling and pressing, hitting that spot again and again. You are losing yourself against my hand.',
      prompt: '"I can feel how close you are. You are clenching around me."',
      options: [
        { text: 'I make you come — just say please', next: 507, transition: '"Please," you beg, and I hammer that spot. "Come for me. Now."', energy: 3 },
        { text: 'I keep you on the edge', next: 508, transition: 'I slow down at the edge, teasing you until you whimper.', energy: 2 }
      ]
    },
    {
      id: 504,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'I finger you harder, the sound of it wet and obscene in the dark. Your hands grip the sheets. Your eyes roll back.',
      prompt: '"You wanted harder. Take it. Take everything I give you."',
      options: [
        { text: 'You take it all', next: 509, transition: 'You take every thrust of my fingers, moaning, arching, coming apart.', energy: 3 },
        { text: 'Three fingers — I fill you', next: 510, transition: 'I add a third finger, stretching you wide. You gasp and grab me. "Fuck."', energy: 3 }
      ]
    },
    {
      id: 505,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1050,
      scene: 'My fingers fuck you deep and slow, my thumb circling your clit. Two sensations at once — you are unraveling, helpless against my hand.',
      prompt: '"You like that? Being taken apart by my fingers?"',
      options: [
        { text: 'Yes — I do not stop', next: 511, transition: 'I do not stop. I work you toward a shattering climax, watching every expression.', energy: 3 },
        { text: 'You are going to come', next: 512, transition: 'You are about to come — I feel you tightening around me.', energy: 3 }
      ]
    },
    {
      id: 506,
      level: 4,
      mood: 'vulnerable',
      energy: 3,
      symbol: '👅',
      pause: 1200,
      scene: 'Three fingers stretch you wide, and I curl them inside you, pressing up. You are completely full of me, completely open.',
      prompt: '"Too much?" I ask, watching your face. You shake your head. "More."',
      options: [
        { text: 'More — I do not stop', next: 513, transition: 'I push deeper, curling, and you start to shake.', energy: 3 },
        { text: 'I slow down — you want to feel it', next: 514, transition: 'I slow, letting you feel every inch of my fingers inside you.', energy: 2 }
      ]
    },
    {
      id: 507,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1350,
      scene: 'You come on my fingers — hard, clenching around me, your whole body shaking. I keep working you through it until you push my hand away, gasping.',
      prompt: 'I kiss your knee. "That was perfect. You were perfect."',
      options: [
        { text: 'You collapse, trembling', next: -1, transition: 'You collapse, spent, and I lie beside you and pull you close.', energy: 1 },
        { text: 'You pull my fingers to your mouth', next: -1, transition: 'I taste myself on your fingers. "You taste incredible."', energy: 2 }
      ]
    },
    {
      id: 508,
      level: 7,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'I keep you on the edge until you are crying — until you beg so sweetly that I finally take pity. The orgasm that follows is violent.',
      prompt: '"I love making you beg," I whisper as you shake in my arms.',
      options: [
        { text: 'You come screaming my name', next: -1, transition: 'You come screaming my name, and I hold you through it.', energy: 3 },
        { text: 'You come silently, shaking', next: -1, transition: 'You come in silence, your body shaking against mine. I kiss your hair.', energy: 2 }
      ]
    },
    {
      id: 509,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1050,
      scene: 'You take everything I give you and then you give it back — coming hard, your body clenching around my fingers, wave after wave.',
      prompt: 'I pull my fingers out slowly and put them in my mouth. "I could taste you forever."',
      options: [
        { text: 'You lie gasping, spent', next: -1, transition: 'You lie gasping, and I lie beside you, stroking your hair.', energy: 1 },
        { text: 'You pull me down and kiss me', next: -1, transition: 'I kiss you deeply. "You are addictive."', energy: 2 }
      ]
    },
    {
      id: 510,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'Three fingers buried deep, you come so hard you see white. I watch you convulse around me, my name on your lips.',
      prompt: '"Look at you. You took all of me."',
      options: [
        { text: 'You did — you took it all', next: -1, transition: 'I kiss you. "And you will take it again later."', energy: 2 },
        { text: 'You are shaking too much to speak', next: -1, transition: 'You shake in my arms, unable to speak. I hold you tight. "I have you."', energy: 1 }
      ]
    },
    {
      id: 511,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1350,
      scene: 'You come undone on my fingers, your body bowing off the bed, your cry echoing in the room. I never stop watching you.',
      prompt: 'I bring my fingers to your lips. "Taste yourself. You earned it."',
      options: [
        { text: 'You taste yourself on me', next: -1, transition: 'You taste yourself and moan. "You taste better than I do."', energy: 2 },
        { text: 'I pull you into my arms', next: -1, transition: 'I pull you into my arms, and you press your face into my neck.', energy: 1 }
      ]
    },
    {
      id: 512,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 900,
      scene: 'You come around my fingers, tight and hot, and I feel every pulse of it. You are screaming my name and I am drowning in you.',
      prompt: 'I hold you through the aftershocks. "I love this. I love you."',
      options: [
        { text: 'I love you too', next: -1, transition: 'The words tumble out. I kiss you, soft and deep.', energy: 1 },
        { text: 'You kiss me, too spent for words', next: -1, transition: 'You kiss me, too spent for words. The silence says everything.', energy: 1 }
      ]
    },
    {
      id: 513,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '👅',
      pause: 1050,
      scene: 'You come so hard your vision whites out, your body arching against my hand. I have never seen you like this — completely, utterly broken open.',
      prompt: 'I gather you up as you come back. "Welcome back, beautiful."',
      options: [
        { text: 'You smile, dazed', next: -1, transition: 'You smile, dazed and glowing. "Do not ever stop doing that."', energy: 1 },
        { text: 'You pull my hand to your chest', next: -1, transition: 'I press your hand to my heart, still pounding from watching you.', energy: 1 }
      ]
    },
    {
      id: 514,
      level: 7,
      mood: 'vulnerable',
      energy: 2,
      symbol: '👅',
      pause: 1200,
      scene: 'Slow and deep, I bring you to a climax that feels like it lasts forever — gentle, endless, overwhelming. You come undone in my arms, tears on your cheeks.',
      prompt: 'I wipe your tears away. "That was love, baby. All of it."',
      options: [
        { text: 'You cry softly, happy', next: -1, transition: 'I hold you as you cry softly. "Let it out. I have you."', energy: 1 },
        { text: 'I whisper "I love you"', next: -1, transition: 'You whisper it first this time. I hold you tighter. "I love you too."', energy: 1 }
      ]
    },

        {
      id: 520,
      level: 1,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 900,
      scene: 'I lie back beside you on my elbow, watching you in the dark. The room is quiet except for your breathing.',
      prompt: '"Touch yourself for me. Start slow. I want to watch the moment you forget I am here — and the moment you remember."',
      options: [
        { text: 'You start slow — I watch every move', next: 521, transition: 'You slide your hand between your thighs, shy at first. I watch you like you are the whole world.', energy: 1 },
        { text: 'You tease yourself — I do not let you rush', next: 522, transition: 'You circle yourself slowly, torturing yourself. I smile. "Good girl. Make me wait."', energy: 2 }
      ]
    },
    {
      id: 521,
      level: 3,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 900,
      scene: 'Your fingers move in slow circles. I have not moved. I am memorizing every breath you take.',
      prompt: '"Faster," I say, voice low. "I want to hear how wet you are for me."',
      options: [
        { text: 'You speed up — moaning my name', next: 523, transition: 'The wet sound fills the room. You moan my name and I watch your fingers move, my jaw tight.', energy: 2 },
        { text: 'You slide two fingers inside yourself', next: 524, transition: 'You finger yourself deeper and gasp. I grin. "That is it. Do it for me."', energy: 2 }
      ]
    },
    {
      id: 522,
      level: 3,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 900,
      scene: 'You hover at your own edge, fingers slowing, watching me watch you. Your eyes ask the question for you.',
      prompt: '"Not yet. You ask me first. Beg me to let you finish."',
      options: [
        { text: 'You beg me — I love your voice', next: 525, transition: '"Please," you whimper, and I let the word hang in the dark. "Again."', energy: 2 },
        { text: 'You hold it — you want to make me proud', next: 526, transition: 'You keep yourself on the edge, trembling, and I nod slowly. "That is my girl."', energy: 1 }
      ]
    },
    {
      id: 523,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'Your hips roll against your own hand. I can feel the heat coming off your skin from here.',
      prompt: '"You are so close. I can see it in the way you clench."',
      options: [
        { text: 'You come for me — I watch it happen', next: 527, transition: 'You shatter under my gaze, crying out, and I watch every second of it.', energy: 3 },
        { text: 'You slow down — you want my hands instead', next: 528, transition: 'You stop yourself and reach for me, desperate. "Not yet," I say. "I am not done watching."', energy: 2 }
      ]
    },
    {
      id: 524,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'Two of your fingers pump inside yourself, your other hand on your clit. You are a wreck, and I love it.',
      prompt: '"Keep going. I want to see you take yourself apart."',
      options: [
        { text: 'You take yourself apart — I watch, greedy', next: 529, transition: 'You finger yourself faster, moaning, and I am rock hard just watching you.', energy: 3 },
        { text: 'You stop and beg me to finish you', next: 530, transition: 'You pull your hand away, trembling. "Please — I need you." I smile slowly. "Say it again."', energy: 2 }
      ]
    },
    {
      id: 525,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'I sit up and move closer, my breath on your ear, still not touching you. You whimper and my control slips.',
      prompt: '"Come for me. Now. I am watching, and I want to see everything."',
      options: [
        { text: 'You come when I say so', next: 531, transition: 'The word breaks you. You come hard, calling my name, and I kiss your forehead as you shake.', energy: 3 },
        { text: 'You hold back — you want to be good for me', next: 532, transition: 'You hold it, shaking, and I whisper "let go" and you do, beautifully.', energy: 2 }
      ]
    },
    {
      id: 526,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 900,
      scene: 'You are right at the edge, hand frozen, asking me with your eyes. I take my time answering.',
      prompt: '"You have been so good. You have earned it. Let go for me."',
      options: [
        { text: 'You let go — I catch you', next: 533, transition: 'You come apart with my name on your lips and I pull you into my arms.', energy: 3 },
        { text: 'You edge yourself once more — you are greedy', next: 534, transition: 'You stop yourself at the last second and laugh breathlessly. I growl. "Now I am going to make you pay for that."', energy: 2 }
      ]
    },
    {
      id: 527,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '👅',
      pause: 1200,
      scene: 'You collapse beside me, trembling and laughing. I pull you in before you can finish the breath.',
      prompt: '"Look what you did to yourself," I murmur, proud. "All for me."',
      options: [
        { text: 'You curl into me, spent and happy', next: -1, transition: 'You curl into me, spent and happy, and I hold you through it.', energy: 1 },
        { text: 'You kiss my neck and melt', next: -1, transition: 'You kiss my neck and melt against me.', energy: 1 }
      ]
    },
    {
      id: 528,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '👅',
      pause: 1200,
      scene: 'You are still shaking against me, your hand limp between us. I am smug and I know it.',
      prompt: '"You asked for it," I tease. "You watched me suffer. Payback."',
      options: [
        { text: 'You laugh and shove me playfully', next: -1, transition: 'You shove me, laughing, and I catch your hand and kiss it.', energy: 1 },
        { text: 'You tell me it was worth it', next: -1, transition: '"Worth it," you say, and I feel ten feet tall.', energy: 1 }
      ]
    },
    {
      id: 529,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '👅',
      pause: 1200,
      scene: 'The dark is quiet now, your head on my chest, my hand in your hair. I feel you smile against my skin.',
      prompt: '"Watching you do that," I say softly, "is the hottest thing I have ever seen."',
      options: [
        { text: 'You smile against my chest', next: -1, transition: 'I feel you smile against my chest.', energy: 1 },
        { text: 'You whisper "I love you" into the dark', next: -1, transition: 'You whisper it into the dark, and the dark keeps it.', energy: 1 }
      ]
    },
    {
      id: 530,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '👅',
      pause: 1200,
      scene: 'I am still holding you, your face hidden in my neck. You are too shy to look at me, and I love it.',
      prompt: '"Look at me," I say gently. "I am right here. Always."',
      options: [
        { text: 'You lift your eyes to mine', next: -1, transition: 'You lift your eyes to mine, and I am still right here.', energy: 1 },
        { text: 'You hold me tighter', next: -1, transition: 'You hold me tighter, and I hold you back.', energy: 1 }
      ]
    },
    {
      id: 531,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '👅',
      pause: 1200,
      scene: 'You are glowing in the dark, completely boneless against me. I am still stroking your hair.',
      prompt: '"Every time you come for me like that," I murmur, "I fall a little more."',
      options: [
        { text: 'You kiss me, tasting yourself', next: -1, transition: 'You kiss me, tasting yourself, and I want more.', energy: 1 },
        { text: 'You pull me close and hold on', next: -1, transition: 'You pull me close and hold on, and I am not going anywhere.', energy: 1 }
      ]
    },
    {
      id: 532,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '👅',
      pause: 1200,
      scene: 'We are tangled together, quiet, your leg thrown over mine. I am tracing your spine with one finger.',
      prompt: '"You were so good for me tonight," I whisper. "I am proud of you."',
      options: [
        { text: 'You nuzzle into my hand', next: -1, transition: 'You nuzzle into my hand, half asleep already.', energy: 1 },
        { text: 'You fall asleep mid-smile', next: -1, transition: 'You fall asleep mid-smile, and it is the best thing I have ever seen.', energy: 1 }
      ]
    },
    {
      id: 533,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '👅',
      pause: 1200,
      scene: 'I have my arms around you, and neither of us is moving. The world outside does not exist tonight.',
      prompt: '"Thank you for trusting me like this," I say. It is the truest thing I know.',
      options: [
        { text: 'You squeeze my hand in answer', next: -1, transition: 'You squeeze my hand — that is all the answer I need.', energy: 1 },
        { text: 'You say "always" into my chest', next: -1, transition: '"Always," you say into my chest, and I believe it.', energy: 1 }
      ]
    },
    {
      id: 534,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '👅',
      pause: 1200,
      scene: 'You are half asleep, but your fingers are still finding mine in the dark. I smile at the ceiling.',
      prompt: '"Tomorrow," I promise, "I am going to make you pay for that little trick."',
      options: [
        { text: 'You mumble "deal" sleepily', next: -1, transition: '"Deal," you mumble, and I grin at the ceiling.', energy: 1 },
        { text: 'You kiss my chest and drift off', next: -1, transition: 'You kiss my chest and drift off, and I follow.', energy: 1 }
      ]
    },

    // ═══ FOREPLAY — tease, deny, make her beg (600-614) ═══
    {
      id: 600,
      level: 1,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I do not touch you where you want me to. I kiss your neck, your collarbone, your shoulder — everywhere but where you ache.',
      prompt: '"You wanted foreplay. So I am going to take my time with you. And you are going to beg."',
      options: [
        { text: 'I kiss you — slow and deep', next: 601, transition: 'I kiss you slow, deep, my hands in your hair. You melt against me.', energy: 1 },
        { text: 'I tease you — I touch you everywhere', next: 602, transition: 'My hands roam everywhere but where you need them. You whimper with frustration.', energy: 2 }
      ]
    },
    {
      id: 601,
      level: 3,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1050,
      scene: 'We kiss until we are both breathless. My hands trace your body through your clothes, teasing every inch of skin they can reach.',
      prompt: '"You are getting wet, are not you?" I murmur against your lips. "I can feel it."',
      options: [
        { text: 'Yes — but you want more', next: 603, transition: '"More?" I smile. "You have not earned more yet." I kiss lower.', energy: 2 },
        { text: 'I make you feel everything first', next: 604, transition: 'I kiss down your neck, your chest, everywhere but there. You arch into me, begging.', energy: 2 }
      ]
    },
    {
      id: 602,
      level: 3,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'I kiss your neck, your collarbone, down your stomach — stopping just above your waistband. You squirm beneath me, desperate.',
      prompt: '"Not yet," I say softly, watching your frustration. "I am not done teasing you."',
      options: [
        { text: 'You beg — I take my time', next: 605, transition: '"Begging already?" I smile against your skin. "I love it."', energy: 2 },
        { text: 'You bite your lip and suffer', next: 606, transition: 'You bite your lip, trembling with need. I take my time, savoring you.', energy: 2 }
      ]
    },
    {
      id: 603,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1350,
      scene: 'I kiss down your body, dragging my lips over your stomach. My breath ghosts over your waistband. You are shaking with anticipation.',
      prompt: '"You want me to keep going?" I ask, hovering. "Ask me nicely."',
      options: [
        { text: 'You beg me — I keep going', next: 607, transition: '"Please," you beg, and I grin. "Say it again. Slower."', energy: 2 },
        { text: 'You grind up against me', next: 608, transition: 'You grind against me, desperate. I hold you down. "No. Not yet."', energy: 3 }
      ]
    },
    {
      id: 604,
      level: 4,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I worship every inch of you with my mouth — your neck, your breasts, the inside of your thighs. Everywhere except where you ache for me.',
      prompt: '"You are beautiful like this," I whisper. "Desperate and mine."',
      options: [
        { text: 'You are mine — I touch you', next: 609, transition: '"Mine," you echo, and I kiss the inside of your thigh, so close.', energy: 2 },
        { text: 'You are going to die of wanting', next: 610, transition: 'You are dying of want, and I love every second of your suffering.', energy: 2 }
      ]
    },
    {
      id: 605,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1050,
      scene: 'I pull your shirt off with my teeth, kissing the newly exposed skin. You are burning under my mouth, desperate for more.',
      prompt: '"You have been so good," I say. "Do you want a reward?"',
      options: [
        { text: 'Yes — you want it so badly', next: 611, transition: '"Then beg for it properly." I wait until you do, until you are trembling.', energy: 2 },
        { text: 'You want to earn it', next: 612, transition: '"Oh, you will earn it." I spend an hour making you ache for it.', energy: 3 }
      ]
    },
    {
      id: 606,
      level: 4,
      mood: 'vulnerable',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'You bite your lip and suffer beautifully, letting me tease you until you are trembling. I could do this forever — watching you need me.',
      prompt: 'I trace your bottom lip with my thumb. "You can ask. You can always ask."',
      options: [
        { text: 'I touch you — you are begging', next: 613, transition: 'Your begging breaks me. I finally touch you, and you gasp like I gave you air.', energy: 3 },
        { text: 'I make you wait longer', next: 614, transition: '"You want to wait?" I smile. "Then we wait. We have all night."', energy: 1 }
      ]
    },
    {
      id: 607,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1350,
      scene: 'You begged so sweetly that I finally gave in — and the kiss turned into so much more. Your body arches against mine as pleasure finally floods you.',
      prompt: 'I kiss your forehead. "See? Begging works."',
      options: [
        { text: 'You gasp, overwhelmed', next: -1, transition: 'You gasp as the pleasure takes over. I hold you through it.', energy: 2 },
        { text: 'I pull you closer, breathless', next: -1, transition: 'You pull me closer, breathless and shaking. "Do not stop."', energy: 2 }
      ]
    },
    {
      id: 608,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'You were so desperate you came just from grinding against me — humping my thigh like you were starving. It was the hottest thing I have ever seen.',
      prompt: '"Did you just come from that?" I laugh, delighted. "You are incredible."',
      options: [
        { text: 'You blush but nod', next: -1, transition: 'You blush and nod, and I kiss you. "I am keeping you forever."', energy: 2 },
        { text: 'I do not stop teasing you', next: -1, transition: '"You want more?" I smile. "I will never stop teasing you."', energy: 2 }
      ]
    },
    {
      id: 609,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1050,
      scene: 'You surrendered completely — begging, arching, finally letting the pleasure take you. It came slowly, like sunrise, spreading through you until you glowed.',
      prompt: 'I kiss your shoulder. "That is what I wanted to give you. Slow. Complete."',
      options: [
        { text: 'You melt into me, full', next: -1, transition: 'You melt into me, complete and warm. "Thank you." "Always."', energy: 1 },
        { text: 'You never want this to end', next: -1, transition: '"It never has to." I hold you like I will never let go.', energy: 1 }
      ]
    },
    {
      id: 610,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'All that wanting, all that teasing — it finally spilled over. You came undone against me, shaking, whispering my name like a prayer.',
      prompt: 'I stroke your hair as you float back down. "I love watching you need me."',
      options: [
        { text: 'I needed you so badly', next: -1, transition: '"I always need you," you whisper. I kiss your forehead.', energy: 1 },
        { text: 'You fall asleep in my arms', next: -1, transition: 'You fall asleep in my arms, spent and safe. I watch you and smile.', energy: 1 }
      ]
    },
    {
      id: 611,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1350,
      scene: 'You begged, I gave in, and it was everything — your body coming apart under my mouth, under my hands, until you forgot your own name.',
      prompt: 'I kiss your smile. "Best foreplay ever?"',
      options: [
        { text: 'Best anything ever', next: -1, transition: 'You laugh, breathless. "Best anything ever." I kiss you again.', energy: 1 },
        { text: 'You are already craving more', next: -1, transition: '"Then we go again." I pull you closer. "I am not tired of you yet."', energy: 2 }
      ]
    },
    {
      id: 612,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'You earned it — an hour of aching, of begging, of almost. When I finally let you come, it hit you like a wave, drowning you in pleasure.',
      prompt: '"You earned that," I whisper. "Every second of it."',
      options: [
        { text: 'You collapse, utterly spent', next: -1, transition: 'You collapse against me, and I hold you through the aftershocks.', energy: 1 },
        { text: 'You are crying happy tears', next: -1, transition: 'Tears roll down your cheeks. I wipe them away. "That is how you know it was good."', energy: 1 }
      ]
    },
    {
      id: 613,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '💋',
      pause: 1050,
      scene: 'Your begging broke me, and my hands gave you everything — fast and hungry, the way you wanted. You came apart so fast it left us both gasping.',
      prompt: '"You were so desperate," I tease, kissing your neck. "I love that about you."',
      options: [
        { text: 'You were — you needed me', next: -1, transition: '"You are mine," you whisper, and my heart stops. "Yes. Always."', energy: 2 },
        { text: 'You laugh, embarrassed', next: -1, transition: 'You laugh, embarrassed, and I kiss the blush off your cheeks.', energy: 1 }
      ]
    },
    {
      id: 614,
      level: 7,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1200,
      scene: 'We waited, and it was worth it — a slow, deep, endless climax that felt like it took an hour and a second at the same time.',
      prompt: 'In the quiet after, you trace patterns on my chest. "Worth the wait?"',
      options: [
        { text: 'Worth everything', next: -1, transition: '"Worth everything," I answer. You smile against my skin.', energy: 1 },
        { text: 'You kiss me without answering', next: -1, transition: 'You kiss me instead of answering. The kiss says it all.', energy: 1 }
      ]
    },

    // ═══ ORAL — my mouth, her surrender (700-714) ═══
    {
      id: 700,
      level: 1,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 900,
      scene: 'I slide down your body, kissing every inch of skin on the way. Your hands tangle in my hair before I have even reached my destination.',
      prompt: 'I look up at you from between your thighs. "Do not pull my hair until I make you."',
      options: [
        { text: 'You want to feel my tongue', next: 701, transition: 'I kiss your inner thigh, slow. "You will feel everything."', energy: 2 },
        { text: 'I devour you', next: 702, transition: 'I grin, dark. "Oh, I will."', energy: 3 }
      ]
    },
    {
      id: 701,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 1050,
      scene: 'I drag my tongue flat across your slit, slow and deliberate. Your hips buck. I do it again, savoring the taste of you.',
      prompt: 'I moan against you. "You taste incredible. I could stay here forever."',
      options: [
        { text: 'Then stay — I do not stop', next: 703, transition: 'I stay, licking you slow and deep, your moans filling the room.', energy: 2 },
        { text: 'I focus on your clit', next: 704, transition: 'I find your clit with my tongue and circle it, watching your face contort.', energy: 3 }
      ]
    },
    {
      id: 702,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 1200,
      scene: 'I bury my face in you like a starving man. My tongue works your clit, my fingers slide inside you — everything at once.',
      prompt: 'You are gripping my hair hard, moaning my name. I do not slow down.',
      options: [
        { text: 'I go faster — you are close', next: 705, transition: 'I speed up, tongue and fingers working together. "Come. Now."', energy: 3 },
        { text: 'Two fingers inside you', next: 706, transition: 'I push two fingers deep inside you while my tongue works you. You cry out.', energy: 3 }
      ]
    },
    {
      id: 703,
      level: 4,
      mood: 'vulnerable',
      energy: 3,
      symbol: '🍆',
      pause: 1350,
      scene: 'Slow and deep, I worship you with my mouth. I lick you like you are the answer to everything. Your thighs shake around my head.',
      prompt: 'I look up at you, lips glistening. "I could do this all night."',
      options: [
        { text: 'Then I do — all night', next: 707, transition: 'I do. I keep going, slow and relentless, until you are trembling.', energy: 2 },
        { text: 'I make you come on my tongue', next: 708, transition: 'I suck your clit into my mouth and work you toward a shattering climax.', energy: 3 }
      ]
    },
    {
      id: 704,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 900,
      scene: 'I focus everything on your clit — circling, flicking, sucking. Your hands are fisted in my hair, your hips grinding against my face.',
      prompt: '"That is it. Use my mouth. Take what you need."',
      options: [
        { text: 'You ride my face', next: 709, transition: 'You ride my mouth, desperate, and I let you use me.', energy: 3 },
        { text: 'I hold you — you are shaking', next: 710, transition: 'I grip your hips and hold you steady as you shake. "I have you."', energy: 2 }
      ]
    },
    {
      id: 705,
      level: 4,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🍆',
      pause: 1050,
      scene: 'My tongue and fingers work you together, relentless, perfect. You are climbing, moaning, gripping my hair like you might break.',
      prompt: '"Come for me. I want to taste you."',
      options: [
        { text: 'You come — you are coming', next: 711, transition: 'You come with a cry, and I drink every drop of you.', energy: 3 },
        { text: 'I do not stop when you come', next: 712, transition: 'I keep going through your orgasm, drawing it out until you push me away.', energy: 3 }
      ]
    },
    {
      id: 706,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '🍆',
      pause: 1200,
      scene: 'Two fingers deep inside you, my mouth on your clit, the world reduced to sensation. You are completely at my mercy.',
      prompt: 'I curl my fingers against that spot while my tongue works you. "Let go. I have got you."',
      options: [
        { text: 'You let go completely', next: 713, transition: 'You let go, and I catch every wave of it on my tongue.', energy: 3 },
        { text: 'Harder — I make you scream', next: 714, transition: 'I finger you harder, suck your clit, and you scream my name.', energy: 3 }
      ]
    },
    {
      id: 707,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1350,
      scene: 'All night, I worshiped you with my mouth — slow, endless, devoted. When you finally came, it rolled through you like a tide, gentle and overwhelming.',
      prompt: 'I kiss your knee, lips slick. "Worth every second."',
      options: [
        { text: 'You are floating', next: -1, transition: 'You float back down to me, and I hold you. "Stay with me."', energy: 1 },
        { text: 'You kiss me, tasting yourself', next: -1, transition: 'I kiss you and you taste yourself on my lips. "Delicious."', energy: 2 }
      ]
    },
    {
      id: 708,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 900,
      scene: 'You came on my tongue — hard, shaking, crying out. I kept my mouth on you until your hips stopped moving, drinking everything you gave me.',
      prompt: 'I crawl up your body and kiss you. "You taste like heaven."',
      options: [
        { text: 'You are speechless', next: -1, transition: 'You are speechless, trembling. I hold you close.', energy: 1 },
        { text: 'Again — you want more', next: -1, transition: '"Again?" I grin. "You will have to beg."', energy: 2 }
      ]
    },
    {
      id: 709,
      level: 7,
      mood: 'intense',
      energy: 2,
      symbol: '🍆',
      pause: 1050,
      scene: 'You rode my face until you came, grinding against my mouth, using me for your pleasure. I loved every second of your selfishness.',
      prompt: 'I wipe my mouth and smile up at you. "My turn next."',
      options: [
        { text: 'You collapse, spent', next: -1, transition: 'You collapse beside me, spent. I pull you in. "You were amazing."', energy: 1 },
        { text: 'You want to taste yourself on me', next: -1, transition: 'You kiss me deeply, tasting yourself. "There you are."', energy: 2 }
      ]
    },
    {
      id: 710,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'I held you steady as you came apart — shaking, gasping, crying. My mouth never left you until you were completely, beautifully undone.',
      prompt: 'I kiss your forehead. "I have got you. I always have you."',
      options: [
        { text: 'You cling to me', next: -1, transition: 'You cling to me, and I hold you like you are the most precious thing.', energy: 1 },
        { text: 'I whisper I love you', next: -1, transition: 'You whisper it, and I kiss you. "I love you too. So much."', energy: 1 }
      ]
    },
    {
      id: 711,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1350,
      scene: 'You came in my mouth and I swallowed everything — every wave, every pulse. You collapsed into the sheets, wrecked, glowing.',
      prompt: 'I lie beside you, cheek against yours. "That was the best meal of my life."',
      options: [
        { text: 'You laugh, wrecked', next: -1, transition: 'You laugh, wrecked and happy. "You are ridiculous." "And yours."', energy: 1 },
        { text: 'I kiss you softly', next: -1, transition: 'You kiss me softly. "I love you." "I love you too."', energy: 1 }
      ]
    },
    {
      id: 712,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 900,
      scene: 'I did not stop when you came — I kept going until you were begging me to stop, pushing my head away, crying from the pleasure.',
      prompt: 'I grin, wiping my mouth. "You said do not stop. I listened."',
      options: [
        { text: 'You hate me — I do it again', next: -1, transition: 'You laugh and curse me, and I know you mean the opposite.', energy: 2 },
        { text: 'I pull you up and kiss you', next: -1, transition: 'I kiss you and you taste yourself on me. "Round two later."', energy: 2 }
      ]
    },
    {
      id: 713,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1050,
      scene: 'You let go completely — your body bowing, your cry raw — and I tasted every second of it. You are still trembling when I crawl up to you.',
      prompt: 'I hold you as you shake. "You were the most beautiful thing I have ever seen."',
      options: [
        { text: 'You are still shaking', next: -1, transition: 'You shake in my arms and I hold you through it.', energy: 1 },
        { text: 'I kiss you, spent and happy', next: -1, transition: 'You kiss me, spent and happy, and I feel like the luckiest person alive.', energy: 1 }
      ]
    },
    {
      id: 714,
      level: 7,
      mood: 'ecstasy',
      energy: 2,
      symbol: '🍆',
      pause: 1200,
      scene: 'You screamed my name and it echoed through the room. My mouth and fingers worked you until you were completely hollowed out, raw, radiant.',
      prompt: 'I gather you into my arms. "I love you. Every part of you."',
      options: [
        { text: 'I love you too', next: -1, transition: 'You say it back, and I hold you tighter. "Forever."', energy: 1 },
        { text: 'You are too spent to speak', next: -1, transition: 'You are too spent to speak, so you kiss me instead. It is enough.', energy: 1 }
      ]
    },

  
    {
      id: 800,
      level: 2,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'You are lying back on the pillows, looking up at me with that look — the one that means you are already melting. My hand rests on your inner thigh, my fingers tracing lazy circles on your skin, warm, waiting.',
      prompt: '"Tell me what you want," I say, my voice low. "I have all night. I want to hear it in your voice while I do it."',
      options: [
        { text: 'Slow — draw it out of me', next: 801, transition: 'I smile against your ear. "Slow. Good. I will make you feel every second."', energy: 1 },
        { text: 'Fast — I am already burning', next: 803, transition: '"Already burning? Then I will stoke it," I say, and slide my hand higher.', energy: 2 },
        { text: 'Tease me — make me beg', next: 805, transition: '"Beg? I will make you forget every word except my name."', energy: 2 }
      ]
    },
    {
      id: 801,
      level: 3,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'My fingers walk up your thigh one knuckle at a time, so slow you can feel the ghost of my touch before I even reach you. You are already shifting, already wanting.',
      prompt: '"Look at you," I murmur. "Not even touched yet and already trembling. Tell me how you feel."',
      options: [
        { text: 'I feel you everywhere', next: 802, transition: '"Everywhere," I echo softly. "I will make sure you mean that."', energy: 1 },
        { text: 'I am so wet for you', next: 806, transition: 'I exhale slowly. "I know. I can feel it from here. I am going to taste it on my fingers tonight."', energy: 2 }
      ]
    },
    {
      id: 802,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'My palm presses flat against you, cupping you through nothing at all, my fingers sliding down the slick heat between your thighs, finding how ready you are for me.',
      prompt: '"Right there," I whisper. "That is how much I want you. Now tell me what you want me to do to you."',
      options: [
        { text: 'Put your fingers inside me', next: 812, transition: '"Inside you," I repeat, and slide one finger in, slow, so you feel every inch of it.', energy: 2 },
        { text: 'Touch me until I break', next: 813, transition: '"Break you," I say darkly. "That is exactly the plan."', energy: 2 }
      ]
    },
    {
      id: 803,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'My fingers find you slick and hot, and I groan against your neck when I feel how ready you are. No games tonight. We both know what this is.',
      prompt: '"You are soaked for me," I breathe against your ear. "Do not hold back. I want to hear every sound you make."',
      options: [
        { text: 'Finger me, hard', next: 807, transition: 'I slide two fingers into you at once, and your hips buck off the bed.', energy: 3 },
        { text: 'Go deep and slow', next: 809, transition: 'I push in deep, slow, and hold there, feeling you clench around me.', energy: 2 }
      ]
    },
    {
      id: 805,
      level: 3,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'My fingers hover just above you, close enough that you can feel the heat of them, close enough to ache. Every time you try to press into my hand, I pull it away.',
      prompt: '"You want it?" I ask, teasing. "Ask me properly. Beg me like you mean it."',
      options: [
        { text: 'Please, I beg you', next: 810, transition: '"That is my girl. You will remember what it felt like to beg."', energy: 1 },
        { text: 'Make me — I am not begging', next: 811, transition: '"Not begging yet? Fine. I will make you forget you ever had pride."', energy: 2 }
      ]
    },
    {
      id: 806,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'One finger slides through your slick folds, slow and deliberate, coating itself in you before pressing against your clit in a slow, unbroken circle.',
      prompt: '"Say my name," I command softly. "I want to hear it in your voice when your hips start moving."',
      options: [
        { text: 'I moan your name', next: 814, transition: 'It breaks out of you like a prayer, and I circle your clit faster, feeding on the sound.', energy: 2 },
        { text: 'I bite my lip instead', next: 815, transition: 'You try to stay quiet. I grin. "That is fine. I will break that silence myself."', energy: 2 }
      ]
    },
    {
      id: 807,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'Two fingers deep inside you, curling, finding that spot that makes your whole body jump. I work you in a rhythm that is merciless, and the sound of how wet you are fills the quiet room.',
      prompt: '"Look at you," I rasp. "Taking me like you were made for it. Tell me — right there?"',
      options: [
        { text: 'Right there — do not stop', next: 816, transition: 'I do not stop. I do not slow down. I make that spot my home.', energy: 3 },
        { text: 'Faster, please', next: 817, transition: 'I obey. I give you faster, harder, until your legs are shaking around my wrist.', energy: 3 }
      ]
    },
    {
      id: 809,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'I sink into you slowly, one finger then two, filling you inch by inch until you are stretched around me, whimpering, clenching. I hold still, letting you feel how full you are.',
      prompt: '"Feel that?" I murmur. "That is me, inside you. Now move for me. Grind on my fingers."',
      options: [
        { text: 'I ride your fingers', next: 818, transition: 'You rock against my hand, and I let you take what you need, watching you chase it.', energy: 3 },
        { text: 'I stay still — you move', next: 819, transition: '"My turn," I say, and start a slow, deep rhythm that has you gasping.', energy: 3 }
      ]
    },
    {
      id: 810,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 900,
      scene: 'I finally touch you — a single finger, flat against your clit, not moving. Just pressure. Just presence. You are shaking from the want of it.',
      prompt: '"You begged so prettily," I say. "So I will give you this, exactly this much. Now tell me — how much do you need me?"',
      options: [
        { text: 'More than air', next: 820, transition: '"More than air," I repeat, and finally move, slow circles that make your eyes roll back.', energy: 2 },
        { text: 'I need you to ruin me', next: 821, transition: '"Ruin you," I say softly. "That can be arranged."', energy: 2 }
      ]
    },
    {
      id: 811,
      level: 4,
      mood: 'teasing',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'I tease you until your pride cracks — circling your clit, pulling away, sliding a fingertip inside just to feel you gasp, then leaving you empty.',
      prompt: '"Not begging?" I ask, amused. "Interesting. Because your hips keep chasing my hand. Your body knows what your mouth will not say."',
      options: [
        { text: 'I surrender — I beg', next: 822, transition: 'It tears out of you, desperate and broken, and I reward you instantly.', energy: 2 },
        { text: 'I take your hand and guide you inside me', next: 823, transition: 'You take control, pushing my fingers deep, and I let you — for now.', energy: 3 }
      ]
    },
    {
      id: 812,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'My finger slides into you, slow, so slow you can feel every ridge of me, and I curl it up, searching, until I find the spot that makes your breath catch and your back arch.',
      prompt: '"Found it," I say, low and satisfied. "Now I am going to talk to you while I work it. You are going to answer me."',
      options: [
        { text: 'I answer — whatever you ask', next: 824, transition: '"Good girl. First question: whose fingers are these?"', energy: 2 },
        { text: 'I just moan — I cannot think', next: 825, transition: '"Cannot think? Then I will think for both of us. I have you."', energy: 2 }
      ]
    },
    {
      id: 813,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'Two fingers inside you now, pumping slow and deep, my thumb circling your clit in the same rhythm. You are trying to talk but the words keep breaking.',
      prompt: '"Keep your eyes on me," I tell you. "Whatever I am doing to you — I want to see you feel it."',
      options: [
        { text: 'I keep my eyes on you', next: 826, transition: 'You hold my gaze while I take you apart, and it is the most beautiful thing I have ever seen.', energy: 2 },
        { text: 'My eyes roll back', next: 827, transition: 'I slow down just to make you look at me again. "No. Eyes on me."', energy: 2 }
      ]
    },
    {
      id: 814,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'Your hips are moving against my hand now, chasing my fingers, and the wet sound of you fills the room. My fingers are shining with you.',
      prompt: '"You hear that?" I ask, voice rough. "That is how much you want me. I am going to make you come like this — just my fingers, just my voice."',
      options: [
        { text: 'Make me come', next: 828, transition: 'I curl my fingers and press my thumb down, and take you to the edge.', energy: 3 },
        { text: 'Do not stop talking', next: 826, transition: '"I will talk you through every second of it. You will come on my voice alone."', energy: 2 }
      ]
    },
    {
      id: 815,
      level: 5,
      mood: 'teasing',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'I pull my fingers out just long enough to make you whimper, then slide them back in, deeper, adding a second, watching your whole body clench around me.',
      prompt: '"You tried to stay quiet," I say, amused. "Look at you now. Tell me what you are thinking."',
      options: [
        { text: 'I am thinking about how deep you are', next: 824, transition: '"Good. Then feel it. Every inch. Every time you clench around me."', energy: 2 },
        { text: 'I am thinking I need more', next: 816, transition: '"More? I will give you more than you can survive."', energy: 3 }
      ]
    },
    {
      id: 816,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1200,
      scene: 'My fingers work you relentlessly — curling, pressing, stroking that spot until your thighs are trembling and you are babbling, saying anything, everything.',
      prompt: '"You are close," I say, my voice in your ear, steady and sure. "I can feel it. Your whole body is begging me. Hold it for me. Not yet."',
      options: [
        { text: 'I hold it — I wait for you', next: 828, transition: 'You teeter on the edge, shaking, trusting me completely. I smile. "Now."', energy: 3 },
        { text: 'I cannot hold it', next: 829, transition: '"Then let go," I command, and you do — falling apart completely.', energy: 3 }
      ]
    },
    {
      id: 817,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1200,
      scene: 'Faster. Harder. My fingers plunge into you while my thumb grinds your clit, and your moans have turned into one long, broken sound. The bed is creaking.',
      prompt: '"That is it," I growl. "That is my girl. Do not be polite. Show me what I do to you."',
      options: [
        { text: 'I scream for you', next: 829, transition: 'The sound tears out of you, raw and perfect, and I work you through every wave of it.', energy: 3 },
        { text: 'I come silent and shaking', next: 825, transition: 'You come hard and silent, whole body arching, and I do not stop until you push my hand away.', energy: 3 }
      ]
    },
    {
      id: 818,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'You ride my hand, setting your own pace, your head thrown back, your hair spread across the pillow. My fingers are buried deep in you and you are taking what you want.',
      prompt: '"This is how I love watching you," I say, voice thick. "Taking what is yours. Tell me where you need it."',
      options: [
        { text: 'Deeper — right there', next: 828, transition: 'I give you deeper, curling into that spot, and you cry out my name.', energy: 3 },
        { text: 'Faster now', next: 826, transition: 'I move faster, matching the desperate roll of your hips until you are trembling.', energy: 3 }
      ]
    },
    {
      id: 819,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'I set a deep, unhurried rhythm, my fingers sliding in and out of you while my thumb draws slow circles on your clit. Every stroke pushes you higher, one slow stair at a time.',
      prompt: '"Listen to me," I say quietly. "I want you to tell me the second you feel it building. I want to hear it in your voice."',
      options: [
        { text: 'It is building', next: 828, transition: '"Good. Now hold it, and tell me again when you cannot anymore."', energy: 2 },
        { text: 'I am already there', next: 829, transition: '"Then come for me, baby. Let me feel you."', energy: 3 }
      ]
    },
    {
      id: 820,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'My fingers circle your clit in a slow, wicked rhythm, teasing you up and down the same spiral, never letting you fall. You are gasping, grinding into my hand.',
      prompt: '"Look how far you have come," I murmur. "Begging me, chasing my hand. You are so beautiful when you want."',
      options: [
        { text: 'I want you inside me', next: 824, transition: 'I slide two fingers in, and you gasp like you have been waiting your whole life.', energy: 3 },
        { text: 'Just keep doing that', next: 828, transition: 'I keep the rhythm, unbroken, until you are incoherent with it.', energy: 2 }
      ]
    },
    {
      id: 821,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'I ruin you the way you asked — fingers inside you curling hard against that spot, thumb on your clit, everything at once, no mercy, no pause.',
      prompt: '"You asked for this," I say, dark and tender at once. "Now take it. Take everything I give you."',
      options: [
        { text: 'I take it all', next: 829, transition: 'You take it, and you fall apart in my hands, crying my name into the dark.', energy: 3 },
        { text: 'I beg you to slow down', next: 813, transition: 'I slow — just barely — and pull you back from the edge. "You want slow? Then ask me nicely."', energy: 2 }
      ]
    },
    {
      id: 822,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'The moment the word leaves your lips — please — my fingers are on you, two of them deep inside, my thumb pressing your clit, and you are shaking apart in seconds.',
      prompt: '"That is all I needed to hear," I say, triumphant and soft. "Now come. Come for me, and let me feel you."',
      options: [
        { text: 'I come undone', next: 829, transition: 'You come undone around my fingers, wave after wave, and I hold you through every one.', energy: 3 },
        { text: 'I want to taste you after this', next: 825, transition: '"After this," I promise. "But first — you owe me this one."', energy: 2 }
      ]
    },
    {
      id: 823,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 900,
      scene: 'Your hand guides mine, pushes my fingers deep inside you, and I let you set the pace — for a moment. Then my other hand slides up, thumb finding your clit, and I take over.',
      prompt: '"You wanted control," I laugh softly. "That was cute. Now let me show you what control actually is."',
      options: [
        { text: 'Take over — ruin me', next: 816, transition: 'I take over completely, and you stop thinking entirely.', energy: 3 },
        { text: 'Let me stay in charge', next: 818, transition: '"Fine, princess. Ride my fingers. Take what you want."', energy: 2 }
      ]
    },
    {
      id: 824,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1200,
      scene: 'My fingers are deep in you, curled against that spot, moving in a rhythm I know drives you insane. Your hips are rolling against my hand, your voice breaking.',
      prompt: '"Whose fingers are these?" I ask, slow and possessive. "Answer me, and I will give you everything."',
      options: [
        { text: 'Yours. Always yours.', next: 828, transition: 'The words undo you — and me. I press harder. "Now come."', energy: 3 },
        { text: 'Mine — you belong to me too', next: 829, transition: 'I grin. "Fair. We are each other, through and through. Now let go — I have you."', energy: 3 }
      ]
    },
    {
      id: 825,
      level: 6,
      mood: 'tender',
      energy: 3,
      symbol: '💋',
      pause: 1200,
      scene: 'I slow my fingers but do not stop, stroking you gently, watching your face contort with the sweetest kind of surrender. You are completely mine in this moment.',
      prompt: '"That is it," I whisper. "No more thinking. Just feel. I have you. I will always have you."',
      options: [
        { text: 'I feel everything', next: 828, transition: 'I curl my fingers once more and you gasp, hovering on the edge. "Then feel this."', energy: 2 },
        { text: 'Make me feel you', next: 828, transition: 'I press deeper, steady, and take you with me to the edge.', energy: 2 }
      ]
    },
    {
      id: 826,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1200,
      scene: 'My fingers move inside you, relentless, curling and pressing until you are gasping my name over and over like it is the only word you remember.',
      prompt: '"I love how you say my name," I tell you, voice wrecked. "Say it again. Say it when you come."',
      options: [
        { text: 'Your name is the last thing I say', next: 828, transition: 'I press you over the edge and you cry out my name, broken and perfect.', energy: 3 },
        { text: 'I am already saying it', next: 829, transition: 'You are — every breath — and I work you through it until you shatter.', energy: 3 }
      ]
    },
    {
      id: 827,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1200,
      scene: 'I stop moving until your eyes find mine, then slide my fingers back in, deep and slow, holding your gaze while I move inside you.',
      prompt: '"Eyes on me," I say, soft but unbreakable. "I want to see the exact second you come undone."',
      options: [
        { text: 'I keep looking at you', next: 828, transition: 'You hold my eyes through it all, and I watch you fall — beautiful, undone, mine.', energy: 3 },
        { text: 'I try — and fail', next: 826, transition: 'Your eyes roll back as I curl my fingers, and I laugh softly. "Next time, then."', energy: 3 }
      ]
    },
    {
      id: 828,
      level: 7,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1200,
      scene: 'The edge. My fingers press that spot, my thumb grinds your clit, and I can feel you teetering — your body tight, your breath caught, your eyes begging me.',
      prompt: '"Now," I say — one word, final, absolute. "Come for me, baby. I am right here. I am not letting go."',
      options: [
        { text: 'I come hard in your fingers', next: 829, transition: 'You shatter around my fingers, arching off the bed, and I work you through every wave, whispering your name.', energy: 3 },
        { text: 'I come and pull you to me', next: 829, transition: 'You come and pull me down with you, kissing me through the aftershocks, your legs still shaking.', energy: 3 }
      ]
    },
    {
      id: 829,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1200,
      scene: 'The room is quiet now, our breathing tangled. My fingers are still inside you, soft and still, and I can feel your heartbeat pulsing around me as you come down.',
      prompt: '"Stay like this," I murmur. "Just a little longer. I want to feel you like this — soft, open, all mine."',
      options: [
        { text: 'I stay — I am all yours', next: -1, transition: 'You stay, soft and open and mine, and I feel your heartbeat pulse around my fingers until it is slow and sure.', energy: 1 },
        { text: 'I kiss you, still trembling', next: -1, transition: 'You kiss me, still trembling, and I taste the night on your lips.', energy: 1 }
      ]
    },    {
      id: 900,
      level: 1,
      mood: 'tender',
      energy: 1,
      symbol: '🛁',
      pause: 1050,
      scene: 'The bathroom is warm and dim. The bath is drawn — steam curling off the water, candles lit, the mirror fogged. You are still dressed, standing at the edge, looking back at me.',
      prompt: '"Tonight I wash you, inch by inch. Not because you need it — because I want my hands on all of you, slow."',
      options: [
        { text: 'I undress you myself', next: 901, transition: 'I reach for the hem of your shirt, slow. "Let me."', energy: 1 },
        { text: 'You undress and step in first', next: 902, transition: 'You undress and sink into the water with a sigh, and I watch you — already gone.', energy: 1 }
      ]
    },
    {
      id: 901,
      level: 2,
      mood: 'tender',
      energy: 1,
      symbol: '💦',
      pause: 1050,
      scene: 'I undress you piece by piece, folding each thing away, my knuckles brushing your skin with every layer that falls. The water waits, steaming.',
      prompt: '"No rush. Every inch of you deserves to be uncovered slowly."',
      options: [
        { text: 'You undress me too', next: 903, transition: 'You turn it around and undress me, and the bathroom suddenly feels much smaller.', energy: 2 },
        { text: 'I step into the water with you', next: 904, transition: 'I step in behind you and the water closes around both of us.', energy: 1 }
      ]
    },
    {
      id: 902,
      level: 2,
      mood: 'tender',
      energy: 1,
      symbol: '💦',
      pause: 1050,
      scene: 'You are already in the water, up to your shoulders, watching me undress. The candlelight flickers across your wet skin.',
      prompt: '"You look at me like that and I forget my own name." I sink in behind you.',
      options: [
        { text: 'I lie back against you', next: 903, transition: 'You lie back against me and melt into my chest.', energy: 1 },
        { text: 'Wash my hair first', next: 905, transition: 'I take the soap and start with your hair, and your whole body softens.', energy: 1 }
      ]
    },
    {
      id: 903,
      level: 3,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1050,
      scene: 'I take the soap and start with your back — shoulders first, then the long line of your spine, slow circles. Your head falls forward and you sigh.',
      prompt: '"Just close your eyes. I have you."',
      options: [
        { text: 'Your hands slide around my front', next: 906, transition: 'My hands slide around you under the water — soap, steam, skin.', energy: 2 },
        { text: 'Wash my legs, slow', next: 907, transition: 'I take my time with your legs, and you go boneless against the tub.', energy: 1 }
      ]
    },
    {
      id: 904,
      level: 3,
      mood: 'teasing',
      energy: 1,
      symbol: '💦',
      pause: 1050,
      scene: 'I kneel in the water and lift your leg, washing from ankle to thigh, slow and thorough. You laugh when I kiss the inside of your knee.',
      prompt: '"You are ticklish here?" I grin. "Noted."',
      options: [
        { text: 'I lift your foot and kiss your ankle', next: 907, transition: 'I kiss your ankle, and you giggle into the steam.', energy: 1 },
        { text: 'Wash between my thighs', next: 908, transition: 'I move slowly, soap and water, and you hold your breath.', energy: 2 }
      ]
    },
    {
      id: 905,
      level: 3,
      mood: 'tender',
      energy: 1,
      symbol: '💧',
      pause: 1050,
      scene: 'I tip your head back and work the soap into your hair, fingertips slow against your scalp. Your whole body softens into mine.',
      prompt: '"There. You could fall asleep like this. Do not — I am not finished with you."',
      options: [
        { text: 'Your hands slide down my neck', next: 908, transition: 'My hands follow the water down your neck, and you shiver.', energy: 2 },
        { text: 'Wash my front', next: 909, transition: 'I turn you toward me and take my time with the front of you.', energy: 2 }
      ]
    },
    {
      id: 906,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1050,
      scene: 'The soap moves lower, over your shoulders, then slides around to the front of you. My hands cup you, slow circles under the water.',
      prompt: '"You feel how warm you are? That is what you do to me. Just by being here."',
      options: [
        { text: 'I kiss your shoulder', next: 909, transition: 'I kiss your shoulder, then your neck, and you arch back against me.', energy: 2 },
        { text: 'Keep going lower', next: 910, transition: 'My hands keep going lower, slow as the steam.', energy: 3 }
      ]
    },
    {
      id: 907,
      level: 4,
      mood: 'intense',
      energy: 2,
      symbol: '👅',
      pause: 1050,
      scene: 'One hand holds your hip, the other slides between your thighs — soap and water and slow, sure fingers. You grip the edge of the tub.',
      prompt: '"Shhh. We have all night. Let go of the edge."',
      options: [
        { text: 'I pull you closer', next: 910, transition: 'I pull you closer and you feel exactly how much I want you.', energy: 3 },
        { text: 'The water is getting cold', next: 911, transition: 'The water has gone cold — I pull the plug and stand, pulling you up with me.', energy: 2 }
      ]
    },
    {
      id: 908,
      level: 3,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1050,
      scene: 'You turn in the water and take the soap from me. Your hands on my shoulders, my chest, slow and deliberate — your turn to wash me.',
      prompt: '"You washed me," you say, quiet. "Now I wash you. And I do not miss anything."',
      options: [
        { text: 'You wash me the way I washed you', next: 909, transition: 'Your hands on me, slow and deliberate, and I am gone for it.', energy: 2 },
        { text: 'I take over and we finish together', next: 910, transition: 'I take the soap and we finish together, laughing in the steam.', energy: 2 }
      ]
    },
    {
      id: 909,
      level: 4,
      mood: 'tender',
      energy: 2,
      symbol: '💦',
      pause: 1050,
      scene: 'Your hands learn my skin the way mine learned yours. The water has gone warm around us, and I am gone for every inch of it.',
      prompt: '"See? You undo me too. Exactly like this."',
      options: [
        { text: 'I stand and pull you with me', next: 911, transition: 'I stand and pull you up, water streaming off both of us.', energy: 2 },
        { text: 'I kiss you, soap and all', next: 910, transition: 'I kiss you, soap and steam and all, and you kiss me back.', energy: 2 }
      ]
    },
    {
      id: 910,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'I stand and pull you up, water streaming off both of us. The shower is warmer, the steam thicker. I press you back against the tile.',
      prompt: '"Stay right there. I want to see every drop on you."',
      options: [
        { text: 'Your mouth on my neck', next: 912, transition: 'My mouth finds your neck, and the water runs down over both of us.', energy: 2 },
        { text: 'I lift your leg around my hip', next: 913, transition: 'I lift your leg around my hip and press you into the tile.', energy: 3 }
      ]
    },
    {
      id: 911,
      level: 4,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1000,
      scene: 'We are under the water together, my body against yours, the heat of the spray and the heat of us. Your hands are flat on the tile.',
      prompt: '"Say my name against my mouth. I want to feel it."',
      options: [
        { text: 'I take you right here', next: 914, transition: 'I slide inside you against the tile, and the water drums around us.', energy: 3 },
        { text: 'Against the wall, slow', next: 913, transition: 'I turn you to the wall and press against you, slow.', energy: 2 }
      ]
    },
    {
      id: 912,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1000,
      scene: 'My mouth moves over your shoulder, your collarbone, lower — the water runs between us and I taste you, soap and rain.',
      prompt: '"You taste like the bath and the shower and the night. You taste like mine."',
      options: [
        { text: 'I need you inside me', next: 914, transition: 'I lift you a little and slide inside, and the steam swallows your moan.', energy: 3 },
        { text: 'Make me come like this', next: 915, transition: 'My hand finds you under the water, and the rhythm starts to break.', energy: 3 }
      ]
    },
    {
      id: 913,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 950,
      scene: 'I lift your leg around my hip and press into you, slow — steam and tile and your breath breaking. The water drums on your back.',
      prompt: '"Look at me. I want to watch you feel this."',
      options: [
        { text: 'I take you, hard against the tile', next: 915, transition: 'I take you against the tile, and the water cannot keep up with us.', energy: 3 },
        { text: 'Slow, and do not look away', next: 916, transition: 'Slow, deep, your eyes locked on mine — the steam forgets to move.', energy: 3 }
      ]
    },
    {
      id: 914,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 950,
      scene: 'I take you against the tile, deep and slow, the water pouring over us. Your fingers are tangled in my wet hair, your head against my shoulder.',
      prompt: '"You are squeezing me so tight. I am not going anywhere. Come with me."',
      options: [
        { text: 'I take you until you break', next: 916, transition: 'I take you until you break, and you take me with you.', energy: 3 },
        { text: 'We come together, here', next: 917, transition: 'We come together under the water, and the world goes quiet.', energy: 3 }
      ]
    },
    {
      id: 915,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: 'The water. The sound of us. Your hands. Your voice — gone. I am gone. You. You. You. We break together under the spray.',
      prompt: '"Now."',
      options: [
        { text: 'I come with you, now', next: 918, transition: 'We come together, and the water takes the sound of it.', energy: 3 },
        { text: 'Hold me, do not stop', next: 919, transition: 'I hold you through it, and the water drums over both of us.', energy: 3 }
      ]
    },
    {
      id: 916,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 950,
      scene: 'We hold each other, dripping, laughing, breathless, the water still drumming. Your heartbeat is fast against my chest, then slower. Then slower.',
      prompt: '"That. That is what I mean every time I say I love you."',
      options: [
        { text: 'I stay in your arms, dripping', next: 919, transition: 'You stay in my arms, dripping, laughing, and the water drums over both of us.', energy: 1 },
        { text: 'I wrap you in a towel', next: -1, transition: 'I wrap you in a towel, and you feel like the most precious thing I own.', energy: 1 }
      ]
    },
    {
      id: 917,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'I turn the water off and the silence is full of our breathing. I wrap you in a towel and start with your hair, gentle.',
      prompt: '"You first. I have you."',
      options: [
        { text: 'I kiss your damp shoulder', next: -1, transition: 'I kiss your damp shoulder, and you shiver — the good kind.', energy: 1 },
        { text: 'We stand here, breathing the steam', next: -1, transition: 'We stand there breathing the steam, and neither of us moves first.', energy: 1 }
      ]
    },
    {
      id: 918,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'I carry you to the bed, both of us still damp, and lay you down like something precious. You pull me down with you.',
      prompt: '"Stay. Do not go far. I need your warmth."',
      options: [
        { text: 'I carry you to the bed', next: -1, transition: 'I carry you to the bed, and you are as light as water.', energy: 1 },
        { text: 'I hold you, still damp', next: -1, transition: 'I hold you, still damp, and the room smells like the two of us.', energy: 1 }
      ]
    },
    {
      id: 919,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'We lie tangled in the dark, your head on my chest, your hair still a little wet. The room smells like steam and us.',
      prompt: '"Goodnight, my love. I will wash you again tomorrow. And the day after. Every day I get."',
      options: [
        { text: 'I love you, wet and warm', next: -1, transition: 'You say it, wet and warm, and I believe everything.', energy: 1 },
        { text: 'I fall asleep against your chest', next: -1, transition: 'You fall asleep against my chest, and I count your breaths.', energy: 1 }
      ]
    },
    {
      id: 1000,
      level: 1,
      mood: 'teasing',
      energy: 1,
      symbol: '🔥',
      pause: 1000,
      scene: 'You stand in the middle of the room and I sit on the edge of the bed, watching you. The lamp is low. You know what I want. You have always known.',
      prompt: '"This is my favourite fantasy — and you are living it. Undress for me. Slowly. Do not rush. I want to see everything."',
      options: [
        { text: 'You start with the hem of your shirt', next: 1001, transition: 'Your fingers catch the hem of your shirt and lift it inch by inch.', energy: 1 },
        { text: 'You turn your back to me', next: 1002, transition: 'You turn around slowly, showing me the line of your back.', energy: 1 }
      ]
    },
    {
      id: 1001,
      level: 2,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 950,
      scene: 'You lift your shirt over your head, and the light catches your skin. I do not move. I do not breathe. I just watch.',
      prompt: '"Keep going. I want to remember every second of this."',
      options: [
        { text: 'I slide the straps of your bra down', next: 1003, transition: 'You reach back and unclip your bra, letting it fall.', energy: 2 },
        { text: 'You shimmy out of your jeans', next: 1004, transition: 'You unbutton your jeans and roll them down your hips, slow.', energy: 2 }
      ]
    },
    {
      id: 1002,
      level: 2,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 950,
      scene: 'You turn your back to me and look over your shoulder. I watch you undress from behind — the curve of your waist, the dip of your spine.',
      prompt: '"God. I have watched you a thousand times and it never gets old. Turn around."',
      options: [
        { text: 'You turn and face me', next: 1003, transition: 'You turn slowly, your hands dropping to your sides, and I lose my breath.', energy: 2 },
        { text: 'You keep your back to me', next: 1005, transition: 'You keep your back to me and keep undressing, making me wait.', energy: 2 }
      ]
    },
    {
      id: 1003,
      level: 3,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1000,
      scene: 'There is a fire in the room and it is nothing compared to the one between us. Your clothes are on the floor and you stand in the warm light, watching me watch you.',
      prompt: '"You have no idea what you do to me. Come here. Slowly."',
      options: [
        { text: 'You walk to me slowly', next: 1006, transition: 'You walk to me slow, deliberate, and my hands shake for you.', energy: 2 },
        { text: 'I come to you instead', next: 1007, transition: 'I stand and come to you, and the space between us becomes nothing.', energy: 2 }
      ]
    },
    {
      id: 1004,
      level: 3,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1050,
      scene: 'You are down to nothing but the last pieces, and you let them fall too. You stand there, bare, beautiful, brave.',
      prompt: 'I take you in. All of you. "You are the most beautiful thing I have ever seen. And you are mine."',
      options: [
        { text: 'I reach for you', next: 1007, transition: 'I reach for you and my fingers brush your waist like you are made of fire.', energy: 3 },
        { text: 'You come to me', next: 1008, transition: 'You come to me and press yourself against me, and I feel the heat of your skin through my shirt.', energy: 3 }
      ]
    },
    {
      id: 1005,
      level: 3,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 950,
      scene: 'You keep your back to me, unhurried, dropping each piece of clothing like you have all the time in the world. I sit forward, hands gripping the bed.',
      prompt: '"You are a tease. You know exactly what you are doing. Keep going — I am enjoying this far too much to stop you."',
      options: [
        { text: 'You finally turn around', next: 1008, transition: 'You finally turn around, and the sight of you nearly undoes me.', energy: 2 },
        { text: 'I cannot wait any longer', next: 1009, transition: 'I stand and cross the room and take you in my arms.', energy: 3 }
      ]
    },
    {
      id: 1006,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'You stop in front of me and I look up at you, firelight on your skin. I take your hand and kiss your palm, then your wrist.',
      prompt: '"When our skin meets, all the rules break down. You know that, right? Nothing else matters."',
      options: [
        { text: 'I pull you onto the bed', next: 1009, transition: 'I pull you onto the bed and the world outside disappears.', energy: 3 },
        { text: 'I stand and press against you', next: 1010, transition: 'I stand and press my body to yours, and the fire between us catches.', energy: 3 }
      ]
    },
    {
      id: 1007,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1050,
      scene: 'Skin to skin, the fire we both lit burning between us. My hands learn you again like it is the first time — your waist, your ribs, the heat of you.',
      prompt: '"I dreamed about this. About you, like this, in this light. The dream was never this good."',
      options: [
        { text: 'I undress the rest of the way', next: 1010, transition: 'I pull off my shirt and the last of our clothes fall to the floor together.', energy: 3 },
        { text: 'You pull my head down to kiss you', next: 1011, transition: 'You pull me down into a kiss that swallows the whole world.', energy: 3 }
      ]
    },
    {
      id: 1008,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'You are bare and I am not, and the difference is driving me crazy. I pull you into me and you feel how much I want you through my clothes.',
      prompt: '"Undress me. I want your hands on me when I lose every piece of it."',
      options: [
        { text: 'You undress me slowly', next: 1011, transition: 'Your hands work my buttons slow, and I watch your face as you bare me.', energy: 3 },
        { text: 'I cannot wait', next: 1012, transition: 'I lift you and you wrap around me, and nothing in the world matters but you.', energy: 3 }
      ]
    },
    {
      id: 1009,
      level: 6,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1050,
      scene: 'The fire, the dark, the two of us — tangled, breathless, skin sliding on skin. The rest of the world has stopped existing.',
      prompt: '"Say my name. I want to hear it when you fall apart."',
      options: [
        { text: 'I make you come', next: 1012, transition: 'I take you to the edge and hold you there until you shatter.', energy: 3 },
        { text: 'We come together', next: -1, transition: 'We come together and hold each other, the fire and us, nothing else in the world.', energy: 3 }
      ]
    },
    {
      id: 1010,
      level: 7,
      mood: 'ecstasy',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'The fire burns low. We lie tangled in the sheets, my arm around you, your head on my chest, both of us still catching our breath.',
      prompt: '"This is better than any dream. Because it is real, and it is you."',
      options: [
        { text: 'I hold you closer', next: -1, transition: 'You hold me closer, and the fire burns low.', energy: 1 },
        { text: 'You trace my chest', next: -1, transition: 'Your fingers trace my chest, and I memorize the feel of it.', energy: 1 }
      ]
    },
    {
      id: 1011,
      level: 7,
      mood: 'ecstasy',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'I trace your skin with my fingertips like I am memorising it. The firelight dances on your face.',
      prompt: '"I want to remember this forever. Your skin, your breathing, the way you look at me."',
      options: [
        { text: 'I am yours', next: -1, transition: '"I am yours," you say, and I feel it everywhere.', energy: 1 },
        { text: 'I kiss you, soft', next: -1, transition: 'You kiss me, soft, and the firelight catches your face.', energy: 1 }
      ]
    },
    {
      id: 1012,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'You are still shaking, and I hold you through it, kissing your forehead, your temple, your lips. Nothing else has ever mattered this much.',
      prompt: '"You are my favourite story. The one I never want to end."',
      options: [
        { text: 'Then it never ends', next: -1, transition: '"Then it never ends," you whisper, and I hold you tighter.', energy: 1 },
        { text: 'I hold you tighter', next: -1, transition: 'You hold me tighter, and I believe every word I said.', energy: 1 }
      ]
    },
    {
      id: 1100,
      level: 1,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 900,
      scene: 'The air changes. You see it in my eyes — the way I go quiet, the way my jaw sets. You know that look. You know exactly what it means.',
      prompt: '"On your knees." That is all I say. And you know exactly what I mean.',
      options: [
        { text: 'You sink to your knees', next: 1101, transition: 'You sink to your knees in front of me, looking up, and my breath catches.', energy: 2 },
        { text: 'You look up at me, defiant', next: 1102, transition: 'You hold my gaze, chin lifted, a challenge in your eyes. I smile slowly.', energy: 2 }
      ]
    },
    {
      id: 1101,
      level: 2,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 950,
      scene: 'You kneel before me, looking up, and I cup your chin, tilting your face up to mine. My thumb traces your lower lip.',
      prompt: '"Good girl. You know I would never hurt you — but I am going to take what is mine. And you are going to love it."',
      options: [
        { text: 'I guide your head down', next: 1103, transition: 'I guide you down gently, my hand in your hair, and you take me into your mouth.', energy: 3 },
        { text: 'I pull you up by the chin', next: 1104, transition: 'I pull you up and back, pressing you against the wall, my mouth at your ear.', energy: 2 }
      ]
    },
    {
      id: 1102,
      level: 2,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 950,
      scene: 'You hold my gaze, chin lifted, daring me. I walk around you slowly, and you feel me watching every inch of you.',
      prompt: '"Defiant. I love it. We will fix that in a minute."',
      options: [
        { text: 'You are going to behave', next: 1103, transition: 'I take your chin and tilt your face up. "Are you going to behave?"', energy: 3 },
        { text: 'I turn you over my knee', next: 1105, transition: 'I sit and pull you over my knee, your skin bared to my hand.', energy: 3 }
      ]
    },
    {
      id: 1103,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'I guide you down and you take me into your mouth, and I watch you — your eyes on mine, your hair in my fist. I am in no hurry.',
      prompt: '"Slow. Look at me. That is it. You are perfect like this."',
      options: [
        { text: 'I hold your hair gently', next: 1106, transition: 'My fist tightens gently in your hair, guiding your rhythm, and I watch you take me.', energy: 3 },
        { text: 'I let you set the pace', next: 1107, transition: 'I let you take the lead and groan, head back, as you decide how fast.', energy: 2 }
      ]
    },
    {
      id: 1104,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 950,
      scene: 'I pull you up and pin you against the wall, my forearm across your chest, my mouth at your ear, my thigh between your legs.',
      prompt: '"You like it when I am rough with you. Say it."',
      options: [
        { text: 'I like it', next: 1107, transition: 'You say it and I press closer, one hand sliding down between your legs. "Good girl."', energy: 2 },
        { text: 'I make you say it again', next: 1108, transition: '"Louder. I want to hear it." You say it again, breathless, and I grin.', energy: 3 }
      ]
    },
    {
      id: 1105,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 950,
      scene: 'You are over my knee, bare and warm under my palm. I spank you once — sharp — and you gasp, your hips pressing down into me.',
      prompt: '"Count them. I want to hear you."',
      options: [
        { text: 'One — I spank you again', next: 1108, transition: '"One." I spank you again, harder, and your voice shakes.', energy: 3 },
        { text: 'You arch up, asking for more', next: 1109, transition: 'You press back into my hand, asking without words, and I know exactly what you want.', energy: 3 }
      ]
    },
    {
      id: 1106,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'My fist is in your hair, firm but gentle, guiding your rhythm. You take me deeper and I groan, head back against the wall.',
      prompt: '"That is it. Take all of me. You were made for this."',
      options: [
        { text: 'I let you take control', next: 1109, transition: 'I loosen my grip and let you take over, and you devour me.', energy: 2 },
        { text: 'I take you deeper', next: 1110, transition: 'I take you deeper, and you moan around me, your eyes watering, looking up.', energy: 3 }
      ]
    },
    {
      id: 1107,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'You say it and I press closer, my hand sliding down between your legs. You are already wet, and I laugh low in your ear.',
      prompt: '"Look how ready you are. My rough girl. My good girl. Both of you are mine."',
      options: [
        { text: 'I touch you slowly', next: 1110, transition: 'I slide my fingers over you, slow, teasing, while I hold you pinned.', energy: 3 },
        { text: 'I make you beg', next: 1111, transition: 'I stop and wait. "Beg for it."', energy: 3 }
      ]
    },
    {
      id: 1108,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 950,
      scene: '"One. Two." I spank you again, and again, each one harder — and each time you press back into my hand, chasing it.',
      prompt: '"You are counting wrong on purpose. You want more. Say it."',
      options: [
        { text: 'More — please', next: 1111, transition: '"Please." That word. I give you exactly what you asked for.', energy: 3 },
        { text: 'I stop and hold you', next: 1112, transition: 'I stop, and pull you into my lap, your skin warm and stinging. "That is enough. You were so good."', energy: 2 }
      ]
    },
    {
      id: 1109,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'You are bent over the edge of the bed, and I am behind you, my hand tangled in your hair, your body arching back into mine.',
      prompt: '"Beg for it. I want to hear how much you need me."',
      options: [
        { text: 'Please — I need you', next: 1112, transition: 'You beg me and I slide into you, both of us groaning.', energy: 3 },
        { text: 'I make you wait', next: 1113, transition: 'I hold you on the edge, teasing, until you are trembling. "Not yet."', energy: 3 }
      ]
    },
    {
      id: 1110,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 1000,
      scene: 'I push inside you — hard, deep — and you cry out. My hand is on the back of your neck, your body pinned, and I take you like I own you.',
      prompt: '"Look at me. I want to see your eyes when you come."',
      options: [
        { text: 'I take you hard', next: 1113, transition: 'I take you hard and deep, and you claw at the sheets, moaning my name.', energy: 3 },
        { text: 'I slow down — you are close', next: -1, transition: 'I slow to a tease at the very edge, and when I move again you shatter around me, screaming my name.', energy: 3 }
      ]
    },
    {
      id: 1111,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '🔥',
      pause: 1100,
      scene: 'You come apart for me — rough and loud and beautiful — and I am right there with you, my forehead against yours, both of us shaking.',
      prompt: '"That is my girl. Mine. Fucking mine."',
      options: [
        { text: 'I am yours', next: -1, transition: 'You say it — "I am yours" — and I feel it in my bones.', energy: 1 },
        { text: 'You kiss me, hard and soft at once', next: -1, transition: 'You kiss me, hard and soft at once, and I kiss you back the same way.', energy: 1 }
      ]
    },
    {
      id: 1112,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'I pull you into my arms and hold you, stroking your back where it is warm, kissing the top of your head. The rough part is over. This part is mine too.',
      prompt: '"You were so good for me. Are you okay? Tell me."',
      options: [
        { text: 'I am perfect', next: -1, transition: 'You say "I am perfect," and I check every inch of you with my hands to be sure.', energy: 1 },
        { text: 'You hold me tighter', next: -1, transition: 'You hold me tighter, and the rough part falls away.', energy: 1 }
      ]
    },
    {
      id: 1113,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'We lie tangled, your cheek on my chest, my hand in your hair, your heartbeat slowly returning to normal against mine.',
      prompt: '"I love you more when I am rough with you — because I get to hold you after, and remember you chose me."',
      options: [
        { text: 'I always choose you', next: -1, transition: '"I always choose you," you say, and I hold you like I might break.', energy: 1 },
        { text: 'I kiss your chest', next: -1, transition: 'You kiss my chest, right over my heart, and I go quiet.', energy: 1 }
      ]
    },    {
      id: 1200,
      level: 1,
      mood: 'tender',
      energy: 1,
      symbol: '🪞',
      pause: 1000,
      scene: 'I take your hand and lead you to the full-length mirror. I stand behind you, my hands on your shoulders, and there we are — both of us, in the glass.',
      prompt: '"I want you to see what I see. Stay. Do not look away."',
      options: [
        { text: 'I undress you myself', next: 1201, transition: 'I reach for the hem of your shirt, slow. "Let me."', energy: 2 },
        { text: 'You undress yourself', next: 1202, transition: 'I step back, hands up. "Show me. The slow way."', energy: 1 }
      ]
    },
    {
      id: 1201,
      level: 2,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1050,
      scene: 'I undress you piece by piece in front of the glass, and every time you start to look away, I turn your chin back.',
      prompt: '"No. Keep looking. You are not allowed to hide from me tonight."',
      options: [
        { text: 'I look at you instead of myself', next: 1203, transition: 'I catch your chin in the glass. "Eyes front, my love."', energy: 1 },
        { text: 'I watch myself being undressed', next: 1204, transition: 'You hold your own gaze in the mirror, and I see you decide to stay.', energy: 2 }
      ]
    },
    {
      id: 1202,
      level: 2,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1050,
      scene: 'You undress yourself, slow, hands a little shy at the buttons. I watch you from behind, my reflection soft.',
      prompt: '"You are the most beautiful thing I have ever undressed. Even when you doubt it."',
      options: [
        { text: 'I meet my own eyes in the glass', next: 1203, transition: 'Your eyes find themselves, and you do not run.', energy: 1 },
        { text: 'I look at you in the mirror instead', next: 1205, transition: 'You watch me watching you, and something in your face settles.', energy: 1 }
      ]
    },
    {
      id: 1203,
      level: 3,
      mood: 'teasing',
      energy: 1,
      symbol: '💋',
      pause: 1050,
      scene: 'I turn you gently to face the glass, my hands on your hips, my lips near your ear. There you are. Whole. Mine.',
      prompt: '"That is you. Look at her. She is the one I love."',
      options: [
        { text: 'I look — really look', next: 1206, transition: 'You look, and I feel you stop hiding.', energy: 2 },
        { text: 'You point out what you love', next: 1207, transition: 'I start with your neck. Then I will not stop.', energy: 2 }
      ]
    },
    {
      id: 1204,
      level: 3,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1050,
      scene: 'For the first time tonight you hold your own gaze in the mirror. Not looking away. Not judging. Just seeing.',
      prompt: '"There she is. I have missed her."',
      options: [
        { text: 'I keep looking at myself', next: 1207, transition: 'I keep your gaze with mine, and I show you what I see.', energy: 1 },
        { text: 'I look at us together', next: 1208, transition: 'You watch the two of us, and I watch you soften.', energy: 2 }
      ]
    },
    {
      id: 1205,
      level: 4,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1050,
      scene: 'You watch me watching you in the glass, and something in your shoulders loosens. You stop checking yourself. You start seeing.',
      prompt: '"That is the look. The one that undoes me. Every single time."',
      options: [
        { text: 'I watch your hands on me', next: 1208, transition: 'My hands find your waist, and you do not look away.', energy: 2 },
        { text: 'I watch my own reflection, learning', next: 1209, transition: 'You are learning your own face, and I want to teach you more.', energy: 2 }
      ]
    },
    {
      id: 1206,
      level: 4,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1000,
      scene: 'My mouth finds your neck in the glass — slow, deliberate — and your breath fogs the mirror. Your eyes stay open, watching yourself feel.',
      prompt: '"Do you see? This is you. Wanting. Unashamed. Beautiful."',
      options: [
        { text: 'I watch myself want', next: 1209, transition: 'You watch yourself want, and it is the hottest thing I have seen.', energy: 3 },
        { text: 'I arch back into you', next: 1210, transition: 'You arch back into me, and your eyes find mine in the glass.', energy: 3 }
      ]
    },
    {
      id: 1207,
      level: 4,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1050,
      scene: 'I point at your reflection, piece by piece. Your neck. The curve of your hip. The place where your waist turns. Each one, named like a blessing.',
      prompt: '"That. And that. And that. Every inch of you is my favorite thing."',
      options: [
        { text: 'I start to believe you', next: 1210, transition: 'I see you start to believe it, and it changes everything.', energy: 2 },
        { text: 'Show me my face the way you see it', next: 1208, transition: 'I frame your face in the glass, and I show you.', energy: 1 }
      ]
    },
    {
      id: 1208,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '💋',
      pause: 1000,
      scene: 'Your own hand traces your reflection — your collarbone, your waist — and I watch you learn the shape of yourself in my eyes.',
      prompt: '"Yes. Touch yourself like that. That is how I touch you in my mind, all day."',
      options: [
        { text: 'I watch myself, and I like her', next: 1209, transition: 'You watch yourself and — there it is. The smile.', energy: 2 },
        { text: 'Your hands find me too', next: 1211, transition: 'My hands slide down your body, and yours slide back.', energy: 3 }
      ]
    },
    {
      id: 1209,
      level: 4,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1000,
      scene: 'My hands move over you in the glass, but you have closed your eyes again. I stop. I wait. You feel the pause and open them.',
      prompt: '"Look at yourself. Not at me. At you. I will wait all night."',
      options: [
        { text: 'I open my eyes and see myself', next: 1212, transition: 'You open your eyes, and you see yourself seeing. Good.', energy: 3 },
        { text: 'I watch you watch me', next: 1213, transition: 'You watch me, and I show you what I mean — slowly.', energy: 3 }
      ]
    },
    {
      id: 1210,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 1000,
      scene: 'My hand slides between your thighs, your head back against my shoulder, and in the glass you watch your own face break open, slow.',
      prompt: '"Keep your eyes open. I want you to see how good you look when I do this."',
      options: [
        { text: 'I watch my face as you work', next: 1211, transition: 'You watch yourself, and I watch you. We are all reflected.', energy: 3 },
        { text: 'I lose myself and close my eyes', next: 1212, transition: 'Your eyes close, and I slow down. "No. Open."', energy: 2 }
      ]
    },
    {
      id: 1211,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 950,
      scene: 'I lift you, your back to the glass, and you are weightless against me. In the mirror you watch your own face, and you do not look away.',
      prompt: '"There you are. The woman who is not afraid of herself anymore."',
      options: [
        { text: 'I watch myself fall apart', next: 1214, transition: 'You watch yourself fall apart, and it is the most beautiful thing I have ever seen.', energy: 3 },
        { text: 'I come in your arms, eyes open', next: -1, transition: 'You come in my arms with your eyes open, and I hold them with mine.', energy: 3 }
      ]
    },
    {
      id: 1212,
      level: 5,
      mood: 'intense',
      energy: 2,
      symbol: '🔥',
      pause: 1050,
      scene: 'You closed your eyes again, hiding. I stop, holding you still, and wait. The silence is patient. The mirror waits with us.',
      prompt: '"Open your eyes, my love. She is still there. She is waiting for you."',
      options: [
        { text: 'I open my eyes and see her', next: 1213, transition: 'You open your eyes, and she is there. You. All of you.', energy: 3 },
        { text: 'I cannot look yet', next: -1, transition: 'You cannot look yet, and I hold you anyway, whispering until you can.', energy: 1 }
      ]
    },
    {
      id: 1213,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: 'You are watching yourself now. Your own eyes. Your own mouth. The woman in the glass is coming undone, and she is you. She is beautiful. She is — you.',
      prompt: '"See? See her? That is her. That is you. I love her."',
      options: [
        { text: 'I see myself, and I am beautiful', next: -1, transition: 'You see yourself — truly — and I see it land in your eyes.', energy: 1 },
        { text: 'I come undone, watching', next: -1, transition: 'You come undone watching yourself, and I hold you through every wave.', energy: 3 }
      ]
    },
    {
      id: 1214,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🪞',
      pause: 1200,
      scene: 'I wipe the fog from the glass with my palm. Two people look back at us. One of them is learning to love what she sees.',
      prompt: '"This is you. This is what I have always seen. Come meet her properly."',
      options: [
        { text: 'I tell her she is beautiful', next: -1, transition: 'You say it to your own reflection, and I kiss the top of your head.', energy: 1 },
        { text: 'I hold you, both of us in the glass', next: -1, transition: 'We stay, the two of us in the glass, and neither of us moves.', energy: 1 }
      ]
    },
    {
      id: 1300,
      level: 1,
      mood: 'teasing',
      energy: 1,
      symbol: '🍆',
      pause: 1000,
      scene: 'We settle on the bed, opposite ends, and it takes a moment to arrange ourselves — your thighs over my shoulders, mine over yours. I look up the length of you, and you look down the length of me.',
      prompt: '"We do this together. My mouth on you, yours on me. But there is a rule: whoever begs first, loses."',
      options: [
        { text: 'Let the games begin', next: 1301, transition: 'I take you first, slow, and I hear your breath catch.', energy: 2 },
        { text: 'I start — my turn to taste', next: 1302, transition: 'You take me first, and I groan into you.', energy: 2 }
      ]
    },
    {
      id: 1301,
      level: 2,
      mood: 'teasing',
      energy: 2,
      symbol: '👅',
      pause: 1000,
      scene: 'I take my time with you — slow, deliberate, learning your rhythm from the way your hips move. Your hands are in my hair, your thighs trembling around me.',
      prompt: '"That is it. Take what you need. I am not going anywhere."',
      options: [
        { text: 'I set the pace, faster', next: 1303, transition: 'You tighten around me and speed up, and I match you.', energy: 3 },
        { text: 'I want to taste you slowly', next: 1304, transition: 'I slow down, and you whimper — exactly what I wanted.', energy: 2 }
      ]
    },
    {
      id: 1302,
      level: 3,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1000,
      scene: 'You take me into your mouth, and you are good at this — too good. My hands are tangled in your hair, my head falling back.',
      prompt: '"Where did you learn — do not answer. Just keep going."',
      options: [
        { text: 'You set the rhythm', next: 1303, transition: 'You find your rhythm, and I let you run it.', energy: 2 },
        { text: 'I take over, gentle but sure', next: 1305, transition: 'I take over, slow and sure, and you moan around me.', energy: 3 }
      ]
    },
    {
      id: 1303,
      level: 4,
      mood: 'teasing',
      energy: 2,
      symbol: '🔥',
      pause: 950,
      scene: 'We are close now, both of us, a delicious stalemate. I can feel you teetering, and I know you can feel me too.',
      prompt: '"The rule stands. You want to come? Then make me come first. Fair is fair."',
      options: [
        { text: 'I work you harder', next: 1306, transition: 'I work you harder, and I feel you lose the thread.', energy: 3 },
        { text: 'I take you to the edge', next: 1307, transition: 'I take you to the edge and hold you there, humming.', energy: 3 }
      ]
    },
    {
      id: 1304,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💦',
      pause: 950,
      scene: 'You go at me like you mean it — greedy, hungry, perfect. My hips rise to meet you, and I am not as patient as I pretend.',
      prompt: '"Okay. Okay. That is — you are cheating. I love it. Do not stop."',
      options: [
        { text: 'I push you closer', next: 1307, transition: 'I take you to the edge, and you beg into my thighs.', energy: 3 },
        { text: 'I bring you right to the edge', next: 1308, transition: 'I bring you right to the edge, and you are shaking.', energy: 3 }
      ]
    },
    {
      id: 1305,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 950,
      scene: 'It is a race and you are winning — I can feel it in the way your hands shake in my hair. I slow down, just to hear you plead.',
      prompt: '"Shhh. We have time. Let me enjoy this before you destroy me."',
      options: [
        { text: 'I beg you not to stop', next: 1308, transition: 'You beg me, and I grant it — for now.', energy: 3 },
        { text: 'I push you past your pride', next: 1309, transition: 'I push you, and you start to fall apart.', energy: 3 }
      ]
    },
    {
      id: 1306,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '🔥',
      pause: 950,
      scene: 'I pull back just as you are about to fall, holding you at the edge. You are trembling, trapped between my hands and your own need.',
      prompt: '"Not yet. Not until you say it. Say what you want."',
      options: [
        { text: 'I beg you not to stop', next: 1309, transition: 'You beg me, broken and honest, and I give you what you asked for.', energy: 3 },
        { text: 'I take what I want', next: 1310, transition: 'You take it — you finish yourself on my mouth, and I let you.', energy: 3 }
      ]
    },
    {
      id: 1307,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 950,
      scene: 'You take over completely — your rhythm, your pace, your hands in my hair. I go still and let you use me. You are glorious like this.',
      prompt: '"Yes. Like that. Take it. I am yours to use."',
      options: [
        { text: 'I ride you, my rhythm', next: 1310, transition: 'You ride me, and I feel you come undone around me.', energy: 3 },
        { text: 'I want you to take back control', next: 1311, transition: 'You give it back, and I take it — gladly.', energy: 3 }
      ]
    },
    {
      id: 1308,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '👅',
      pause: 950,
      scene: 'My hands find your hips and I set the tempo for both of us — faster, deeper, one rhythm, two bodies. You are gasping around me.',
      prompt: '"This is mine. You are mine. And I am yours. Say it."',
      options: [
        { text: 'I take you, faster', next: 1311, transition: 'I take you faster, and you let me.', energy: 3 },
        { text: 'I push you to the edge', next: 1312, transition: 'I push you, and I feel us both heading over.', energy: 3 }
      ]
    },
    {
      id: 1309,
      level: 6,
      mood: 'intense',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: 'We are both close now, a heartbeat from the edge. I can feel you tightening, and you can feel me losing my mind. One of us has to break first.',
      prompt: '"Come with me. Now. Together."',
      options: [
        { text: 'We come together — now', next: 1312, transition: 'We go over the edge together, and the world goes quiet.', energy: 3 },
        { text: 'I finish you with my mouth', next: 1313, transition: 'I finish you with my mouth, and you fall apart.', energy: 3 }
      ]
    },
    {
      id: 1310,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: 'You come on my mouth, and you are loud and broken and mine. I do not stop until you are empty and shaking.',
      prompt: '"That is it. Let go. I have you."',
      options: [
        { text: 'You hold my head and do not let go', next: 1313, transition: 'You hold my head and ride it out, and I take every wave.', energy: 3 },
        { text: 'I keep going until you beg me to stop', next: 1314, transition: 'I keep going until you beg, then I hold you through it.', energy: 3 }
      ]
    },
    {
      id: 1311,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '👅',
      pause: 900,
      scene: 'My turn — and you are merciless, exactly as taught. My hands grip the sheets, my head falls back, and I am gone.',
      prompt: '"Do not stop. Do not — I am going to — "',
      options: [
        { text: 'I take you, and I do not stop', next: 1314, transition: 'You take me, and I break in your mouth.', energy: 3 },
        { text: 'We finish together', next: 1315, transition: 'You feel me go, and you go with me.', energy: 3 }
      ]
    },
    {
      id: 1312,
      level: 7,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💦',
      pause: 900,
      scene: 'We come in the same breath — two bodies, one wave. Your hands in my hair, mine on your hips, the room full of us.',
      prompt: '"That. Whatever that was. Again. Tonight."',
      options: [
        { text: 'We stay tangled, catching our breath', next: -1, transition: 'You stay tangled on me, breathless, and I kiss your knee.', energy: 1 },
        { text: 'I kiss my way up your body', next: -1, transition: 'I kiss my way up your body, slow, and you shiver.', energy: 1 }
      ]
    },
    {
      id: 1313,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'We untangle, laughing at ourselves — you slide down to lie beside me, your head on my shoulder, still trembling a little.',
      prompt: '"I think we broke the rules. Both of us. Worth it."',
      options: [
        { text: 'You pull me up for a kiss', next: -1, transition: 'You pull me up and kiss me, and it tastes like both of us.', energy: 1 },
        { text: 'I lay my head on your stomach', next: -1, transition: 'I lay my head on your stomach and feel you breathe.', energy: 1 }
      ]
    },
    {
      id: 1314,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'I pull you up until your head rests on my chest, and your hand finds mine in the dark. We are quiet, and it is perfect.',
      prompt: '"You are the best thing that has ever happened to my mouth. To me. To everything."',
      options: [
        { text: 'You hold my hand, still shaking', next: -1, transition: 'You hold my hand, still shaking, and I hold back.', energy: 1 },
        { text: 'I whisper your name, like a prayer', next: -1, transition: 'I whisper your name, and the room keeps it.', energy: 1 }
      ]
    },
    {
      id: 1315,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'I am half asleep, and you are tracing shapes on my chest. I catch your hand and kiss it.',
      prompt: '"We are doing that again. Soon. I mean tonight."',
      options: [
        { text: 'We do that again. Soon', next: -1, transition: '"Soon," I promise. "Tonight, if you want."', energy: 1 },
        { text: 'I fall asleep on you', next: -1, transition: 'I fall asleep on you, and it is the best place in the world.', energy: 1 }
      ]
    },
    {
      id: 1400,
      level: 1,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1050,
      scene: 'The first light is grey and soft through the curtains. You are still asleep, warm against me, your back to my chest. I kiss your shoulder.',
      prompt: '"Good morning, my love. I have been awake for a while, just watching you breathe."',
      options: [
        { text: 'I kiss your shoulder awake', next: 1401, transition: 'You stir, making that small sleepy sound, and I kiss your shoulder again.', energy: 1 },
        { text: 'You feel me before you wake', next: 1402, transition: 'You feel me against you — already hard — and you smile without opening your eyes.', energy: 2 }
      ]
    },
    {
      id: 1401,
      level: 2,
      mood: 'tender',
      energy: 1,
      symbol: '💋',
      pause: 1050,
      scene: 'You wake slowly, your voice thick with sleep. "What time is it?" I pull you closer. "Time for nothing. Go back to sleep. I have you."',
      prompt: 'My hand slides over your hip, slow, warm. "Just stay here with me. Let me touch you before the day starts."',
      options: [
        { text: 'I slide my hand over your hip', next: 1403, transition: 'My hand moves over your hip, your stomach, your skin still warm from sleep.', energy: 2 },
        { text: 'You roll into me', next: 1404, transition: 'You roll into me, burrowing into my chest, and I wrap myself around you.', energy: 1 }
      ]
    },
    {
      id: 1402,
      level: 2,
      mood: 'teasing',
      energy: 2,
      symbol: '💋',
      pause: 1000,
      scene: 'You are still half asleep, but you feel exactly what is pressed against you, and you smile into the pillow.',
      prompt: '"You feel that? That is what you do to me just by sleeping next to me."',
      options: [
        { text: 'You arch back into me', next: 1403, transition: 'You arch back into me, pressing close, and I groan into your hair.', energy: 2 },
        { text: 'You reach back for me', next: 1405, transition: 'Your hand finds me under the covers, and I bite my lip.', energy: 3 }
      ]
    },
    {
      id: 1403,
      level: 3,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1050,
      scene: 'Slow morning hands — no rush, nowhere to be. I trace your skin under the covers while the light grows, and you make that small contented sound.',
      prompt: '"This is my favourite part of the day. You, me, and no one else in the world yet."',
      options: [
        { text: 'I touch you slowly', next: 1406, transition: 'I touch you slow, gentle, and you open for me like a secret.', energy: 2 },
        { text: 'You pull my hand lower', next: 1407, transition: 'You take my hand and guide it lower, and I follow you without question.', energy: 3 }
      ]
    },
    {
      id: 1404,
      level: 3,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1050,
      scene: 'You are wrapped around me, your leg hooked over mine, your face buried in my neck, still half asleep and completely trusting.',
      prompt: 'I whisper into your hair. "You are so soft like this. So mine. I could stay here all day."',
      options: [
        { text: 'I lift your leg', next: 1407, transition: 'I lift your leg over my hip and you feel me settle against you.', energy: 2 },
        { text: 'I turn you onto your back', next: 1408, transition: 'I turn you gently onto your back, and you look up at me, sleepy and wanting.', energy: 2 }
      ]
    },
    {
      id: 1405,
      level: 3,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1000,
      scene: 'Your hand works me slow under the covers, your eyes still closed, and I press my forehead to your back, breathing hard.',
      prompt: '"You are going to ruin me before breakfast. Do not stop."',
      options: [
        { text: 'I slide into you slowly', next: 1408, transition: 'I slide into you slowly, both of us sighing, the morning gone quiet.', energy: 3 },
        { text: 'You push back against me', next: 1409, transition: 'You push back into me, guiding me home, and we move together slow.', energy: 3 }
      ]
    },
    {
      id: 1406,
      level: 4,
      mood: 'tender',
      energy: 2,
      symbol: '💋',
      pause: 1100,
      scene: 'Slow and deep, the way mornings should be. The sheets are tangled, the light is warm, and you are looking up at me like I am the whole world.',
      prompt: 'I hold your face in my hands. "I love you. I love waking up to you. I love this."',
      options: [
        { text: 'I move slowly', next: 1409, transition: 'I move inside you slow and deep, and you sigh my name.', energy: 2 },
        { text: 'You wrap your leg around me', next: 1410, transition: 'You wrap your leg around me and pull me deeper, and I lose my rhythm.', energy: 3 }
      ]
    },
    {
      id: 1407,
      level: 4,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1050,
      scene: 'I slide into you from behind, slow, spooned against you, and we both let out a breath we have been holding all night.',
      prompt: '"Good morning," I murmur against your neck, and you feel me smile. "It is now."',
      options: [
        { text: 'We move together, slow', next: 1410, transition: 'We move together slow, still tangled in sleep, and the world outside does not exist.', energy: 2 },
        { text: 'You turn your head for a kiss', next: 1411, transition: 'You turn your head and kiss me, deep, while I stay inside you.', energy: 2 }
      ]
    },
    {
      id: 1408,
      level: 5,
      mood: 'intense',
      energy: 3,
      symbol: '💋',
      pause: 1050,
      scene: 'On your back now, morning light on your face, my weight warm on you. I move slow, watching every expression cross your face.',
      prompt: '"I want to see you. I want to watch you feel this. You are so beautiful in the morning light."',
      options: [
        { text: 'I stay slow — you are close', next: 1411, transition: 'I stay slow, teasing you toward it, and you grip my shoulders.', energy: 2 },
        { text: 'I speed up', next: 1412, transition: 'I speed up, and the quiet morning fills with both of our sounds.', energy: 3 }
      ]
    },
    {
      id: 1409,
      level: 5,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💋',
      pause: 1050,
      scene: 'The sheets are a mess, the pillows scattered, and we have forgotten the time, the day, the world. There is only this.',
      prompt: 'I breathe against your mouth. "I am close. Tell me you are close. I want us to come together."',
      options: [
        { text: 'I feel you tighten', next: 1412, transition: 'I feel you tighten around me and I am gone, groaning your name.', energy: 3 },
        { text: 'You pull me deeper', next: 1413, transition: 'You pull me deeper and hold me there, and we fall over together.', energy: 3 }
      ]
    },
    {
      id: 1410,
      level: 6,
      mood: 'ecstasy',
      energy: 3,
      symbol: '💋',
      pause: 1100,
      scene: 'We come together in the warm light — you first, then me — your cry muffled in the pillow, mine buried in your neck, the morning holding its breath.',
      prompt: 'I hold you through it, stroking your hair. "That is my girl. My sleepy, perfect girl."',
      options: [
        { text: 'I stay inside you', next: 1413, transition: 'I stay inside you, soft, and kiss your shoulder. Neither of us moves.', energy: 1 },
        { text: 'We lie tangled', next: -1, transition: 'We lie tangled, catching our breath, the morning light warm on our skin.', energy: 1 }
      ]
    },
    {
      id: 1411,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'You lie in the crook of my arm, your hand on my chest, both of us warm and quiet. The day can wait. We cannot.',
      prompt: '"This is my favourite way to wake up. I want this for the rest of my life."',
      options: [
        { text: 'Every morning', next: -1, transition: '"Every morning," you say, and I kiss your forehead like it is a vow.', energy: 1 },
        { text: 'You kiss my chest', next: -1, transition: 'You kiss my chest, and the morning waits for us.', energy: 1 }
      ]
    },
    {
      id: 1412,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'The sheets are ruined and so are we — laughing, breathless, your leg over mine, the morning golden around us.',
      prompt: '"We are never getting out of bed. I have decided. This is our new life."',
      options: [
        { text: 'I agree completely', next: -1, transition: 'You agree completely, and we both know it is a lie and a promise.', energy: 1 },
        { text: 'You pull the covers over us', next: -1, transition: 'You pull the covers over us, and the world can keep itself.', energy: 1 }
      ]
    },
    {
      id: 1413,
      level: 7,
      mood: 'tender',
      energy: 1,
      symbol: '🫂',
      pause: 1200,
      scene: 'I hold you, still joined, still warm, my lips on your forehead. The light moves across the room and neither of us cares.',
      prompt: '"Good morning, my love. Best morning of my life. And tomorrow we do it again."',
      options: [
        { text: 'I love you', next: -1, transition: 'You say it, and the morning is golden around us.', energy: 1 },
        { text: 'You smile into my chest', next: -1, transition: 'You smile into my chest, and I feel it like sunlight.', energy: 1 }
      ]
    },
  ];
}