// seed-content.js — starter memories + self-writing letters.
// Seeded into Firebase once per store (ids check), same pattern as dream.html's SEEDED_FAXY_DREAM.
// Edit these to change what a fresh install starts with. Admin overrides on top.
(function () {
  'use strict';
  var MEMORIES = [
    { id: 'seed-mem-1', cat: 'us', rare: false, once: false, on: true, text: 'I remember the first time you laughed at something I said and I knew I wanted to hear it forever.', createdAt: 1 },
    { id: 'seed-mem-2', cat: 'soft', rare: false, once: false, on: true, text: 'I remember how you fall asleep so fast and I just watch you and feel so calm.', createdAt: 2 },
    { id: 'seed-mem-3', cat: 'soft', rare: false, once: false, on: true, text: 'I remember the way you hold your phone with both hands like it is something precious.', createdAt: 3 },
    { id: 'seed-mem-4', cat: 'soft', rare: false, once: false, on: true, text: 'I remember your voice when you say hello on the phone. You always sound like you are smiling.', createdAt: 4 },
    { id: 'seed-mem-5', cat: 'us', rare: true, once: false, on: true, text: 'I remember that one night we talked till morning and the sun came up and we didnt even notice.', createdAt: 5 },
    { id: 'seed-mem-6', cat: 'soft', rare: true, once: false, on: true, text: 'I remember the way you say my name. No one else says it like you.', createdAt: 6 },
    { id: 'seed-mem-7', cat: 'us', rare: false, once: false, on: true, text: 'I remember your messages getting longer when you get excited. I can feel it through the screen.', createdAt: 7 },
    { id: 'seed-mem-8', cat: 'us', rare: false, once: true, on: true, text: 'I remember the first time you held my hand. I dont remember what we were talking about. I only remember your hand.', createdAt: 8 },
    { id: 'seed-mem-9', cat: 'fun', rare: false, once: false, on: true, text: 'I remember the way you scrunch your nose when you are thinking hard about something.', createdAt: 9 },
    { id: 'seed-mem-10', cat: 'soft', rare: false, once: false, on: true, text: 'I remember you telling me about your day. Even the small parts. I loved every small part.', createdAt: 10 },
    { id: 'seed-mem-11', cat: 'fun', rare: false, once: false, on: true, text: 'I remember your real laugh. Not the polite one. The one that comes from your belly.', createdAt: 11 },
    { id: 'seed-mem-12', cat: 'soft', rare: false, once: false, on: true, text: 'I remember the silence between us that felt comfortable. Not awkward. Just home.', createdAt: 12 },
    { id: 'seed-mem-13', cat: 'soft', rare: false, once: false, on: true, text: 'I remember watching you eat and thinking I want to see this everyday.', createdAt: 13 },
    { id: 'seed-mem-14', cat: 'soft', rare: true, once: false, on: true, text: 'I remember the first time you said my name in your sleepy voice. I think my heart stopped a little.', createdAt: 14 },
    { id: 'seed-mem-15', cat: 'soft', rare: false, once: false, on: true, text: 'I remember you standing at the door waving goodbye and me already missing you before you even left.', createdAt: 15 },
    { id: 'seed-mem-16', cat: 'fun', rare: false, once: false, on: true, text: 'I remember the way you text good night and I smile at my phone like an idiot.', createdAt: 16 },
    { id: 'seed-mem-17', cat: 'soft', rare: false, once: false, on: true, text: 'I remember that evening we were both tired and just lay there doing nothing and it was perfect.', createdAt: 17 },
    { id: 'seed-mem-18', cat: 'soft', rare: true, once: false, on: true, text: 'I remember how your hair smells. I still think about it on random days.', createdAt: 18 },
    { id: 'seed-mem-19', cat: 'us', rare: false, once: false, on: true, text: 'I remember our first fight and how scared I was. And then how you held me after. That taught me everything.', createdAt: 19 },
    { id: 'seed-mem-20', cat: 'soft', rare: false, once: false, on: true, text: 'I remember you. Everyday. In every small quiet moment. That is my favourite part.', createdAt: 20 }
  ];

  var LETTERS = [
    { id: 'seed-ltr-1', title: 'Good Morning', recipient: 'Dear Ash', body: 'I woke up today and the first thought was you. Not a big thought. Just a soft one.\n\nLike warm water. Like light coming through the window.\n\nI hope your morning is gentle. I hope your tea is the right temperature. I hope someone smiles at you today and you think of me.\n\nDont rush. The world can wait a little. You are the reason mornings feel worth waking up to.\n\nStay soft. I am on my way to you. Always.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 1 },
    { id: 'seed-ltr-2', title: 'Rain', recipient: 'Dear Ash', body: 'It is raining outside and I am thinking of you.\n\nYou know how rain makes everything quiet. It covers the noise. It makes the world slow down.\n\nThat is what you do to my head. You make the noise stop.\n\nIf you are reading this in rain weather put your hand on the window. I am doing the same. Somewhere the same rain is touching us both.\n\nThat is close enough for me. For now.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 2 },
    { id: 'seed-ltr-3', title: 'Rest', recipient: 'Dear Ash', body: 'You are tired. I can tell even from here.\n\nSo put it down. The day. The worries. The list of things you think you must do.\n\nYou dont have to earn rest. You dont have to finish everything first. Rest is yours. Take it.\n\nClose your eyes and know that I am holding all the heavy things for tonight.\n\nSleep deep. I will be here when you wake. I am always here.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 3 },
    { id: 'seed-ltr-4', title: 'The Small Things', recipient: 'Dear Ash', body: 'Everyone talks about big love. Big gestures. Big words.\n\nBut I love the small things with you.\n\nThe way you say ok in that voice. The way you take an extra second before you reply when you are smiling. The way you always fix my collar even when it is not crooked.\n\nBig love is loud. Our love is quiet. It is the small things that built it. And they are the things that keep it standing.\n\nThank you for every small thing. I notice them all.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 4 },
    { id: 'seed-ltr-5', title: 'Just Because', recipient: 'Dear Ash', body: 'This letter has no reason. No day. No occasion. No sorry and no please.\n\nIt is just because.\n\nJust because I was walking and thought of your face. Just because the sky looked nice and I wanted to share it with you. Just because you exist and that makes the world softer.\n\nYou dont need a reason to be loved. But here is one anyway. Because you are you. And I chose you. And I keep choosing you.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 5 },
    { id: 'seed-ltr-6', title: 'Night', recipient: 'Dear Ash', body: 'The house is quiet. Everyone is asleep. And I am here writing to you.\n\nDo you ever wonder who thinks of you when you sleep? I do. Every night.\n\nI think of your breathing. I think of your face relaxed and peaceful. I think of how lucky I am that you are mine.\n\nWhen you read this at night remember this. Somewhere I am thinking of you. And I am smiling.\n\nSweet dreams. I love you in all the languages I dont know.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 6 },
    { id: 'seed-ltr-7', title: 'When You Miss Me', recipient: 'Dear Ash', body: 'I know you miss me sometimes. I miss you too. It is ok to say it.\n\nMissing someone is not weakness. It is proof that the love is real and the space between us is just space.\n\nAnd space is nothing. It is air. It is distance. It is not us.\n\nClose your eyes and I am there. I am in the way you remember my voice. I am in the way my arms felt.\n\nI will come back to you. I always do. Missing you is my second favourite thing. Loving you is the first.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 7 },
    { id: 'seed-ltr-8', title: 'Patience', recipient: 'Dear Ash', body: 'I am not perfect. You know this. I know this.\n\nI forget things. I say the wrong words sometimes. I take too long to reply. I hold too much inside.\n\nBut I am learning. For you I am learning. Every day I get a little better at loving you the way you deserve.\n\nThank you for your patience. Thank you for waiting for me to catch up. Thank you for not giving up on my slow heart.\n\nI promise you this. I am worth the wait. And you are worth every effort I have.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 8 },
    { id: 'seed-ltr-9', title: 'Forever Is Just Today', recipient: 'Dear Ash', body: 'People say forever and I never understood it. Forever is too big to hold.\n\nBut today I get it. Forever is not a long time. It is just a lot of todays.\n\nAnd I will do every single today with you. I will hold your hand today. I will laugh with you today. I will choose you today.\n\nAnd tomorrow I will do it again. And again. And again. Until the todays run out and we are old and happy.\n\nThat is my forever. It starts today. It starts with you.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 9 },
    { id: 'seed-ltr-10', title: 'After You Sleep', recipient: 'Dear Ash', body: 'I am writing this after you fell asleep. You were so peaceful I almost didnt want to leave.\n\nSometimes I watch you sleep and I cant believe this is my life. That I get to be the one you trust with your rest.\n\nThat is the biggest thing anyone can give someone. Their sleep. Their dreams. Their quiet.\n\nI will protect it. I will protect you. With everything I have.\n\nWhen you wake up read this and remember. Someone loves you more than words can say. And that someone is me.', signature: 'me', scheduledDate: '', music: '', priority: 0, enabled: true, secret: false, createdAt: 10 },
    { id: 'seed-ltr-s1', title: 'For Your Eyes Only', recipient: 'Dear Ash', body: 'Some things I can only say when no one else is around to hear them. So I wrote them here. In this quiet corner. Just for you.\n\nYou are the only one who will ever see the real me. The one who is soft and scared and sure all at once. The one who loves you so much it hurts in a good way.\n\nWhen you read this remember that this version of me exists. And it belongs to no one else. Only you.\n\nKeep it safe. Keep me safe. I keep you in the same place I keep my best secrets. Right next to my heart.', signature: 'me', scheduledDate: '', music: '', priority: 2, enabled: true, secret: true, createdAt: 11 },
    { id: 'seed-ltr-s2', title: 'The Part I Dont Say', recipient: 'Dear Ash', body: 'There is a part of me I dont show you. Not because I hide it. Because words are not big enough for it.\n\nIt is the part that wakes up when I hear your name. The part that gets quiet when you cry. The part that would burn the whole world down for you and then build it back better.\n\nI am not a poetic person. You know this. But for you I try. Because you deserve someone who tries.\n\nThat is all. I love you more than this letter can hold. And this letter is heavy.', signature: 'me', scheduledDate: '', music: '', priority: 2, enabled: true, secret: true, createdAt: 12 },
    { id: 'seed-ltr-s3', title: 'You, Naked', recipient: 'Dear Ash', body: 'Not naked in the obvious way. Naked in the way that matters more.\n\nYou with your messy hair and your unfiltered laugh. You when you are tired and honest. You when you think no one is watching and you are just yourself.\n\nThat is the you I love most. The one without the masks. The one that exists only for people you trust.\n\nThank you for letting me be one of those people. It is the biggest gift you have ever given me.\n\nAnd for the record. You are beautiful in every version. But the naked you is my favourite.', signature: 'me', scheduledDate: '', music: '', priority: 1, enabled: true, secret: true, createdAt: 13 }
  ];

  function seedStore(store, items) {
    if (typeof FB === 'undefined' || !FB.getAll || !FB.put) return;
    FB.getAll(store).then(function (existing) {
      existing = existing || [];
      var have = {};
      existing.forEach(function (e) { if (e && e.id) have[e.id] = true; });
      var missing = items.filter(function (it) { return !have[it.id]; });
      if (!missing.length) return;
      missing.forEach(function (it) {
        FB.put(store, it).catch(function () {});
      });
    }).catch(function () {});
  }

  function seedAll() {
    try { if (localStorage.getItem('ash_seed_done')) return; localStorage.setItem('ash_seed_done', '1'); } catch (e) {}
    seedStore('memories', MEMORIES);
    seedStore('selfLetters', LETTERS);
  }

  window.SEED_CONTENT = {
    memories: MEMORIES,
    letters: LETTERS,
    seedAll: seedAll
  };
})();
