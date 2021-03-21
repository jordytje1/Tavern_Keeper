require('dotenv').config();
const { Client, Collection } = require('discord.js');
const keepAlive = require('./server');
const prefix = "!";
const PREFIX = "!";
const unverify_role = 'Your Unverified RoleID Here';
const config = require("./config.json");
const { MessageEmbed } = require("discord.js");
const verify_role = '752905551318351904';
const Discord = require("discord.js");

const log = '753313405833576498';
const welcomes = '715172419131670569'
const welcome = '752211512248107177'
const embed = require('discord.js');
const bannedWords = [`kut`, `vagina/`, `homo /`, `kanker/`, `kk/`, `kkr/`, `tyfus/`, `tering/`, `penis`, `.gg`, `discord.gg`, `discord gg`, `discordgg`, `discord gg /`];
const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Map();

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


let memberlog = "752211513401671763";










		  
 
let userApplications = {}

client.on("message", function(message) {
  if (message.author.equals(client.user)) return;

  let authorId = message.author.id;

  if (message.content === "%apply") {
      console.log(`Apply begin for authorId ${authorId}`);
      // User is not already in a registration process 
	  
      if (!(authorId in userApplications)) {
          userApplications[authorId] = { "step" : 1}

          message.author.send("```We need to ask some questions so  we can know a litte bit about yourself```");
          message.author.send("```Application Started - Type '#Cancel' to cancel the application```");
          message.author.send("```Question 1: In-Game Name?```");
      }

  } else {

      if (message.channel.type === "dm" && authorId in userApplications) {
          let authorApplication = userApplications[authorId];

          if (authorApplication.step == 1 ) {
              authorApplication.answer1 = message.content;
              message.author.send("```Question 2: Age?```");
              authorApplication.step ++;
          }
          else if (authorApplication.step == 2) {
		   authorApplication.answer2 = message.content;
              message.author.send("```Question 3: Timezone? NA, AU, EU, NZ, or Other? (If other, describe your timezone)```");
              authorApplication.step ++;
          }
          else if (authorApplication.step == 3) {
		   authorApplication.answer3 = message.content;
              message.author.send("```Question 4: Do you have schematica?```");
              authorApplication.step ++;
          }

          else if (authorApplication.step == 4) {
		   authorApplication.answer4 = message.content;
              message.author.send("```Thanks for your registration. Type %apply to register again```");
              delete userApplications[authorId];
    let applystaff = new MessageEmbed()
    .setTitle('apply')
    .setThumbnail(message.author.avatarURL())
    .addFields(
		{ name: 'Question 1: In-Game Name?', value: `${authorApplication.answer1}` },
		{ name: 'Question 2: Age?', value: `${authorApplication.answer2}` },
		{ name: 'Question 3: Timezone? NA, AU, EU, NZ, or Other? (If other, describe your timezone', value: `${authorApplication.answer3}` },
		{ name: 'Question 4: Do you have schematica?', value: `${authorApplication.answer4}` },
	)
    .setColor("#ff2509")
    .setFooter(`Requested`)
    .setTimestamp()
		  client.channels.cache.get('752211513401671763').send(applystaff);
          }

      }
  }


});




var userTickets = new Map();
const discord = require('discord.js');

client.on('ready', () => {
    console.log(client.user.username + " has logged in.");
});

client.on('message', message => {
    /**
     * This first conditional statement is used to give reactions to the embed messages our bot sends.
     * Please note everything here is hard-coded, you are responsible for modifying it to fit your needs.
     */
    if(message.author.bot) {
        if(message.embeds.length === 1 && message.embeds[0].description.startsWith('React')) {
            message.react('822814797497106462')
            .then(msgReaction => console.log('Reacted.'))
            .catch(err => console.log(err));
        }
        if(message.embeds.length === 1 && message.embeds[0].title === 'Ticket Support') {
            message.react('822814797497106462')
            .then(reaction => console.log("Reacted with " + reaction.emoji.name))
            .catch(err => console.log(err));
        }
    };
    /**
     * This was just used to send an initial embed message.
     * I copied the ID of the embed message sent and used that to check if reactions were
     * added to that. Check the 'raw' event.
     */
    if(message.content.toLowerCase() === '?sendmsg') {
        const embed = new Discord.MessageEmbed();
        embed.setAuthor(client.user.username, client.user.displayAvatarURL);
        embed.setDescription('React to this message to open a support ticket');
        embed.setColor('#F39237')
        message.channel.send(embed);
    }
});

/**
 * PLEASE NOTE: ticketreact and checkreact are my OWN custom emojis.
 * You need to modify it to match your own emojis.
 */
client.on('raw', payload => {
    if(payload.t === 'MESSAGE_REACTION_ADD') { // Check if the event name is MESSAGE_REACTION_ADD
        if(payload.d.emoji.name === 'tickets') // If the emoji is ticketreact
        {
            if(payload.d.message_id === '822814797497106462') { // Here we check if the id of the message is the ID of the embed that we had the bot send using the ?sendmsg command.
                let channel = client.channels.get(payload.d.channel_id) // Get the proper channel object.
                if(channel.messages.has(payload.d.message_id)) { // Check if the channel has the message in the cache.
                    return;
                }
                else { // Fetch the message and then get the reaction & user objects and emit the messageReactionAdd event manually.
                    channel.fetchMessage(payload.d.message_id)
                    .then(msg => {
                        let reaction = msg.reactions.get('🎟️');
                        let user = client.users.get(payload.d.user_id);
                        client.emit('messageReactionAdd', reaction, user);
                    })
                    .catch(err => console.log(err));
                }
            }
        }
        // Check if the emoji is checkreact, meaning we're deleting the channel.
        // This will only be significant if our bot crashes/restarts and there are additional ticket channels that have not been closed.
        else if(payload.d.emoji.name === '🎟️') {
            let channel = client.channels.get(payload.d.channel_id);
            if(channel.messages.has(payload.d.message_id)) {
                return;
            }
            else {
                channel.fetchMessage(payload.d.message_id)
                .then(msg => {
                    let reaction = msg.reactions.get('🎟️');
                    let user = client.users.get(payload.d.user_id);
                    client.emit('messageReactionAdd', reaction, user);
                })
                // Additional code that I did not need, but leaving it here for future purposes.
                /*
                .then(msg => msg.embeds.length === 1 && msg.embeds[0].title === 'Ticket Support' ? Promise.resolve(msg.channel) : Promise.reject('Incorrect Msg')
                ).then(ch => ch.delete('closing ticket'))
                .then(guildChannel => console.log("Deleted " + guildChannel.name))
                .catch(err => console.log(err)); */

            }
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === '🎟️') { // If the emoji name is ticketreact, we will create the ticket channel.
        /**
         * Here we need to check the map to see if the user's id is in there, indicating they have a ticket.
         * We also need to check if there are any other guild channels with their name concatenated with 's-ticket'. We need to 
         * check this case because the bot may have crashed or restarted, and their ID won't be stored in the map.
         */
        if(userTickets.has(user.id) || reaction.message.guild.channels.some(channel => channel.name.toLowerCase() === user.username + 's-ticket')) {
            user.send("You already have a ticket!"); // Send user msg indicating they have a ticket.
        }
        else {
            let guild = reaction.message.guild;
            // Create channel based on permissions. Note, you need to modify the permissionsOverwrites array to fit your needs for permissions.
            guild.createChannel(`${user.username}s-ticket`, {
                type: 'text',
                permissionOverwrites: [
                    {
                        allow: 'VIEW_CHANNEL',
                        id: user.id
                    },
                    {
                        deny: 'VIEW_CHANNEL',
                        id: guild.id
                    },
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '625907626303160354'
                    }
                ]
            }).then(ch => {
                userTickets.set(user.id, ch.id); // Once ticket is created, set the user's id as a key mapping to the channel id.
                let embed = new discord.RichEmbed();
                embed.setTitle('Ticket Support');
                embed.setDescription('Please briefly explain your problem here and a staff member will get back to you shortly.');
                embed.setColor('#40BCD8');
                ch.send(embed) // Send a message to user.
            }).catch(err => console.log(err));
        }
    }
    else if(reaction.emoji.name === '🎟️') {
        // If emoji is checkreact, they are trying to close the ticket.
        if(userTickets.has(user.id)) {
            if(reaction.message.channel.id === userTickets.get(user.id)) {
                let embed = new discord.RichEmbed();
                embed.setDescription("Ticket will be closed in 5 seconds.")
                reaction.message.channel.send(embed);
                setTimeout(() => {
                    reaction.message.channel.delete('closing ticket')
                    .then(channel => {
                        console.log("Deleted " + channel.name);
                    })
                    .catch(err => console.log(err));
                }, 5000);
            }
        }
        // This case is really for handling tickets that were not closed by the bot due to the bot possibly crashing.
        // In order for this to actually work, the user needs to have a ticket opened already.
        else if(reaction.message.guild.channels.some(channel => channel.name.toLowerCase() === user.username + 's-ticket')) {
            let embed = new discord.RichEmbed();
            embed.setDescription("Ticket will be closed in 5 seconds.");
            reaction.message.channel.send(embed);
            setTimeout(() => {
                reaction.message.guild.channels.forEach(channel => {
                    if(channel.name.toLowerCase() === user.username + 's-ticket') {
                        channel.delete().then(ch => console.log('Deleted Channel ' + ch.id))
                    }
                });
            }, 5000);
        }
    }
});





var wordList = "aahs abet able ably abut aced aces ache achy acid acme acne acre acts acyl adds adze afar afro agar aged ages agin agog ague ahas ahem ahoy aide aids ails aims airs airy ajar akin alas albs alef ales alga ally alms aloe alps also alto alum ambo amen amid amok amps amyl anal ands anew anon ante ants anus aped aper apes apex apps aqua arch arcs area ares aria arid aril arks arms army arts arty aryl ashs ashy asks asps atom atop aunt aura auto aven aver avid avow away awed awes awls awns awny awol awry axed axel axes axis axle axon ayes ayin azym baas babe baby back bade bags baht bail bait bake bald bale balk ball balm band bane bang bank bans barb bard bare barf bark barm barn bars base bash bask bass bath bats baud bawd bawl bays bead beak beam bean bear beat beau beds beef been beep beer bees beet begs bell belt bend bene bens bent berk berm best beta beth bets bevy bias bibs bide bids bike bile bilk bill bind bins bios bird birr bite bits bitt blab blah blat bleb bled blew blip blob bloc blog blot blow blue blur boar boas boat bobs bode body bogs boil bold bole boll bolt bomb bond bone bonk bony book boom boon boor boos boot bops bore born boss both bots bout bowl bows boxy boys brad brag bran bras brat bray bred brew brie brim brin bris brow brux bubo buck buds buff bugs buhl buhr bulb bulk bull bump bums bunk buns bunt buoy burl burn burp burr burs bury bush busk bust busy buts butt buys buzz byes byte cabs cads cafe cage cake calf call calm calx came camp cams cane cans cant cape caps card care carp cars cart case cash cask cast cats cave caws ceca cede cedi cees cell celt cent cere chad chap char chat chef chew chic chin chip chis chiv chop chow chub chug chum cite city clad clag clan clap claw clay clef clip clod clog clop clot cloy club clue coak coal coat coax cobs cock coda code cods coed cogs coho coif coil coin cola cold cole colt coma comb come cone conk cons cook cool coop coos coot cope cops copy cord core cork corm corn cost cosy cots coup cove cowl cows coys cozy crab crag cram crap crew crib crop crow crud crux cube cubs cuds cued cues cuff cull culm cult cups curb curd cure curl curs curt cusp cuss cute cuts cwms cyan cyma cyme cyst czar dabs dado dads daft dame damn damp dams dank dare dark darn dart dash data date daub dawn days daze dead deaf deal dean dear debt deck deed deem deep deer dees deet deft defy deil dele delf deli dell deme demo demy dene dens dent deny dere derm desk deva dews dewy deys dhow dial dibs dice died dies diet digs dill dime dims dine ding dins dint dips dire dirt disc dish disk ditz diva dive dock dodo doer does doff doge dogs dojo dole doll dolt dome done dons doom door dope dork dorm dorr dors dose dote doth dots doty dove down doxx doxy doze dozy drab drag dram draw dray dreg drew drey drib drip drop drub drug drum dual dubs duck duct dude duds duel dues duet duff duke dull duly dumb dump dune dung dunk duos dupe dusk dust duty dyad dyed dyer dyes dyne dzos each earl earn ears ease east easy eats eave ebbs echo ecru eddy edge edgy edit eeks eels eely eery effs eggs eggy egos eked eker ekes elix elks ells elms else emir emit emus ends enol envy eons epic eras ergo ergs eros etas etch euro even ever eves evil ewer ewes exam exes exit exon expo eyed eyes face fact fade fads fail fain fair fake fall fame fang fans fare farm fast fate fats faun faux fave fawn faze fear feat feds feed feel fees feet fell felt fend fens fern feta feud fibs figs file fill film find fine fink fins fire firm firs fish fist fits five fizz flab flag flan flap flat flaw flax flay flea fled flee flew flex flip flit floe flog flop flow flox flub flue flux foal foam fobs foci foes fogs fogy fohs foil fold folk fond font food fool foot fops fora forb fore fork form fort foul four fowl foxy fozy fray free fret friz frog from fuel fuff fuki full fume fumy fund funk furl furs fury fuse fuss fuze fuzz gabs gaff gaga gage gags gain gait gala gale gall gals game gang gaol gape gaps garb gash gasp gate gave gawk gawp gaze gear geek gees geld gell gels gems gene gent germ gets gift gigs gild gill gilt gimp gins gird girl girn gist give glad glee glen glia glib glob glow glue glug glum glut gnar gnat gnaw gnus goad goal goat gobs goby gods goer goes goji gold golf gone gong good goof goon goop goos gore gory gosh goth gout gown grab gram gray grew grey grid grim grin grip grit grow grub guck guff gulf gull gulp gums gunk guns guru gush gust guts guys gyms gyne gyps gyre gyro hack hags hail hair half hall halo halt hams hand hang haps hard hare hark harm harp hash hasp hate hath hats haul have hawk haws hays haze hazy head heal heap hear heat heck heed heel heir held hell helm help heme hems hens herb herd here hero hers heth hewn hews hick hics hide high hike hill hilt hind hint hips hire hiss hits hive hoar hoax hobo hoed hoer hoes hogs hold hole holy home hone honk hood hoof hook hoop hoot hope hops horn horo hose host hots hour howl hows hubs hued hues huff huge hugs huhs hula hulk hull hump hums hung hunk hunt hurl hurt hush husk huts hymn hype hypo iamb ibex ibis iced icer ices icky icon idea ides idle idly idol iffy ilea ilka ilks ills imam imps inch inks inky inns into ions iota ipad ired ires irid iris irks iron isle isms itch item jabs jack jade jags jail jali jamb jams jars java jaws jays jazz jean jeep jeer jeli jell jerk jest jets jibe jigs jilt jink jinx jive jivy jobs jock jogs join joke jolt josh jots jowl joys judo jugs juke july jump june junk jury just jute juts kale kaon kaph kata kats kava kays keek keel keen keep kegs kelp keps kept kern keys kick kids kill kiln kilt kina kind kine king kink kips kiss kite kits kiwi knar knee knew knit knob knot know knur kook kudu kuna kyak kyat labs lace lack lacy lade lads lady lags laid lain lair lake lamb lame lamp land lane lank laps lard lari lark lash lass last late laud lava lave lawn laws lays laze lazy lead leaf leak lean leap lear leas lede leek leer lees left legs leks lend lens lent lept less lest lets leus levs levy lewd liar lice lick lids lied lien lier lies lieu life lift like lilt lily limb lime limn limo limp limy line link lint lion lips lira lire lirk lisp list lite live load loaf loam loan lobe lobs loch loci lock loco lode loft logo logs loin loll lone long look loom loon loop loos loot lope lops lord lore lory lose loss lost loti lots loud lout love lows luau lube luck luff luge lugs lull lump lung lure lurk lush lust lute lynx lyre mace mach made mage magi maid mail maim main make male mall malt mama mane mans many maps mara mare mark marl mars mart mash mask mass mast mate math mats matt maul maws mayo mays maze mead meal mean meat meek meet meld melt meme memo mend mens menu meow mere mesa mesh mess mews mica mice midi miff mild mile milk mill mils mime mind mine mini mink mint minx mire miss mist mite mitt moan moat mobs mock mode mods moho mold mole molt moms monk mood moon moor moos moot mope mops more moss most moth move mown mows much muck muff mugs mule mull mums muon murk muse mush musk must mute mutt myna myth nabs nags nail name nand nape naps naut nave navy nays nazi neap near neat neck need neon nerd nest nets nevi news newt next nibs nice nick nigh nils nine nips nits nobs nock node nods noel none noon nope norm nose nosy note noun nova nubs nude nuke null numb nuns nuts oafs oaks oars oath oats obey oboe octo odds odes odor offs ogle ogre ohms oils oily oink okay okra olea oleo omen omit omni once ones only onto onus onyx oohs ooid oops ooze oozy opal open opts oral orbs orca ores oryx ouch ours oust outs ouzo oval oven over ovum owed ower owes owls owly owns oxea oxen oxes pace pack pact pads page paid pail pain pair pale pall palm palp pals pane pang pans pant papa paps pare park pars part pass past pate path pats pave pawn paws pays peak peal pear peas peat peck peek peel peep peer pegs pelf pelt pend pens pent peon pepo peps perk perm pert peso pest pets pews phis phiz phub pica pick pied pier pies pigs pike pile pili pill pimp pine ping pink pins pint pion pipe pips pita pith pits pity pius plan play plea pleb pled plod plop plot plow ploy plug plum plus pock pods poem poet pogo poke poky pole poll polo pomp pond pony pooh pool poop poor pope pops pore pork porn port pose posh post posy pots pouf pour pout poxy pram pray prep prey prim prod prom prop pros prow psis pubs puce puck puff pugs puke pull pulp puma pump punk puns punt puny pupa pups pure purr push puts putt pyre qadi qaid qats qoph quad quay quid quin quip quit quiz race rack racy raft rage rags raid rail rain rake rami ramp rams rand rang rank rant rape raps rapt rare rash rasp rate rats rave raws rays raze razz read reak real ream reap rear redo reds reed reef reek reel refs rein rely rend rent repo resh rest revs rhos rial ribs rice rich rick ride rids riel rife riff rift rigs rile rill rily rime rims rind ring rink riot ripe rips rise risk rite rive road roam roan roar robe robs rock rode rods roes roil role roll romp rood roof rook room root rope ropy rose rosy rote rots roue rout rove rows rubs ruby rude rued rues ruff rugs ruin rule rums rune rung runs runt ruse rush rust rute ruts sack sacs safe saga sage sags sagy said sail sake saki sale salt same sand sane sang sank saps sard sari sash sass sate save sawn saws says scab scam scan scar scat scot scry scud scum scuz seal seam sear seas seat sect seed seek seem seen seep seer sees self sell seme send sent sera sere serf seta sets sewn sews sext sexy shah sham shed shew shim shin ship shiv shmo shoe shoo shop shot show shun shut shwa sick side sift sigh sign sikh siku silk sill silo silt sine sing sink sins sips sire sirs site sits sitz size skep skew skid skim skin skip skis skit slab slam slap slat slaw slay sled slew slid slim slip slit slob sloe slog slop slot slow slug slum slur smit smog smug smut snag snap snip snit snob snog snot snow snub snug soak soap soar sobs sock soda sods sofa soft soil sold sole soli solo sols some soms sone song sons soon soot sops sore sort sots soul soup sour sown sows soya soys spam span spar spas spat spay sped spin spit spot spry spud spun spur stab stag star stat stay stem step stew stir stop stow stub stud stun stye styx subs such suck suds sued suer sues suet suit sulk sumo sump sums sung sunk suns suqs sure surf swab swag swam swan swap swat sway swig swim swiz swop swum sync tabs tabu tack taco tact tags tail taka take tala talc tale talk tall tame tamp tams tank tans tape taps tare tarn taro tarp tars tart task taus taut taxa taxi teak teal team tear teas tech teed teem teen tees tell tend tens tent term tern terp test teth text than that thaw thee them then they thin this thou thru thud thug thus tick tics tide tidy tied tier ties tiff tike tile till tilt time tine ting tins tint tiny tipi tips tire tizz toad toed toes toff tofu toga toil toke told toll tomb tome toms tone tong tons took tool toot tops tore torn toro tort toss tote tots tour tout town tows toys tram trap tray tree trek trim trio trip trod tron trot troy true tsar tuba tube tubs tuck tufa tuff tuft tugs tums tuna tune turf turn tusk tutu twig twin twit twos tyke type typo tyro tzar ughs ugly ukes ulna umbo umps undo unit unix unto upon urea urge uric urns used user uses uvea vain vale vamp vane vang vans vape vara vary vase vast vats vatu veal vear veer vees veil vein vela vend vent verb very vest veto vets vial vibe vice vied vies view vile vine viol visa vise vita voes void vole volt vote vows vugs wack wade wadi wads waft wage wags waif wail wait wake wale walk wall waly wand wane want ward ware warm warn warp wars wart wary wash wasp watt wauk waul wave wavy wawl waxy ways weak weal wean wear webs weds weed week ween weep weir weld well welt wend went wept were west wets wham what when whet whew whey whim whip whir whiz whoa whom whop whup wick wide wife wifi wigs wild wile will wilt wily wimp wind wine wing wink wins wipe wire wiry wise wish wisp wist with wits wive woad woes woke woks wolf womb wons wont wood woof wool woos word wore work worm worn wort wove wows wrap wren writ wyes xray xyst yack yaff yagi yaks yald yams yang yank yaps yard yare yarn yaud yaup yawl yawn yawp yaws yeah yean year yeas yegg yeld yelk yell yelm yelp yens yerk yesk yeti yett yeuk yews yill yins yipe yips yird yirr ynal yodh yods yoga yogh yogi yoke yolk yond yoni yore your yowe yowl yows yoyo yuan yuck yuga yuks yule yurt yutz ywis zags zany zaps zarf zati zeal zebu zeds zees zein zens zeps zerk zero zest zeta zhos zigs zinc zine zing zips ziti zits zizz zoea zoic zone zonk zoom zoon zoos zori zulu zyme";
var serverWordLookup = {};
client.once('ready', () => {
    console.log('Ready!');
    wordList = wordList.split(" ");
});

var letterCount = (list) => {
    var res = {};
    for (var i of list) {
        if (res[i] == undefined) res[i] = 1;
        else res[i]++;
    }
    return res;
}


client.on('guildCreate', guild => {
    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
        if(channel.type == "text" && defaultChannel == "") {
            if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
            }
        }
    });
    var serverId = guild.id;
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    serverWordLookup[serverId] = randomWord;
    console.log(randomWord);
    msg = "Hello there! :cow:\nHere's how it works, cowboy.\nI think up a 4 letter word and you have to guess it.\nIf your guess has any letters in the correct position, it is said to be a bull.\nIf your guess has some letters in common with the word I've chosen but not in the exact position, it is a cow.\n\nLet the games begin! Use /bnc <GUESSED_WORD> to play.";
    defaultChannel.send(msg);
});

client.on('message', message => {
    word = serverWordLookup[message.guild.id]
    parts = message.content.split(' ');
    if (message.author.bot) return;
    if (parts[0] == '/bnc') {
        if (parts[1] == 'refresh') {
            const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
            console.log(randomWord);
            serverWordLookup[message.guild.id] = randomWord;
            message.channel.send("New word generated. Start guessing :cow:");
            return;
        }
        if (parts[1].length != 4) {
            message.channel.send("That's not 4 letters long!");
            return;
        }
        if (parts[1] == word) {
            message.channel.send("Good job, you won! I've thought of a new word now :cow:");
            const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
            console.log(randomWord);
            serverWordLookup[message.guild.id] = randomWord;
        }
        else {
            var bulls = 0, cows = 0;
            var guessCounts = letterCount(Array.from(parts[1])), wordCounts = letterCount(Array.from(word));
            for (var i = 0; i < 4; i++) {
                if (word.charAt(i) == parts[1].charAt(i)) bulls++;
            }
            for (var i in guessCounts) {
                if (wordCounts[i] != undefined) {
                    cows += Math.min(wordCounts[i], guessCounts[i]);
                }
            }
            cows -= bulls;
            message.channel.send(message.author.username + "'s guess yields:\n" + "\nBulls: " + bulls + "\nCows: " + cows);
        }
    }
});












client.on('message', async message => {
if(message.content == '!close') {
     message.channel.delete()
}
});












client.on("guildMemberAdd", member => {
  if (member.guild.id !== "715171185133879358") return;
	const welcomess = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been joined ODD warriors")
  client.channels.cache.get(welcomes).send(welcomess);
})
client.on("guildMemberAdd", member => {
  if (member.guild.id !== "752211511996317827") return;
  
	
	
		 const welcomes = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been joined ⚡𝙎𝙥𝙖𝙧𝙠𝙮⚡𝙨𝙪𝙥𝙥𝙤𝙧𝙩 𝙨𝙚𝙧𝙫𝙚𝙧")
  client.channels.cache.get(welcome).send(welcomes);
  member.roles.add("752585847534125096"); // Member role.
})


client.on("guildMemberAdd", member => {
  if (member.guild.id !== "653322621710106635") return;
  
  client.channels.cache.get(log).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
  member.roles.add("653329683085000744"); // Member role.
})

client.on('message', (message) => {

if(message.content == 'ping') {
     message.delete()
}
});


client.on("guildMemberRemove", member => {
  if (member.guild.id !== "752211511996317827") return;
  
	
	
	
	         const bye = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been leaved ⚡𝙎𝙥𝙖𝙧𝙠𝙮⚡𝙨𝙪𝙥𝙥𝙤𝙧𝙩 𝙨𝙚𝙧𝙫𝙚𝙧")
  client.channels.cache.get(welcome).send(bye);
});
client.on("guildMemberRemove", member => {
  if (member.guild.id !== "715171185133879358") return;
  
	
	
	
	         const welcomesss = new Discord.MessageEmbed()
                .setColor(0x333333)
                .setAuthor("👋 " + member.displayName + " has been leaved ODD warriors")
  client.channels.cache.get(welcomes).send(welcomesss);
});



client.on("guildMemberRemove", member => {
  if (member.guild.id !== "653322621710106635") return;
  
  client.channels.cache.get(log).send(`**${member.user.tag}** has left the server 😭`);
});

client.on('message', (message) => {

    if (message.content == "!verify"){
        message.member.roles.add(verify_role)
	    message.delete()
    }

});



client.on(`message`, async message => {
    try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
            if (message.author.id === message.guild.ownerID) return;
            await message.delete();
            await message.channel.send(`**please shut up your mouth and watch your language`);
        }
    } catch (e) {
        console.log(e);
    }
});





var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = 'play.questal.eu'; // Your MC server IP or hostname address
var mcPort = 25607; // Your MC server port (25565 is the default)

var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;

function getStatus() {
    return new Promise((resolve, reject) => {
        request(url, function(err, response, body) {
            var status;
            if(err) {
                console.log(err);
                reject(new Error('API error'));
            } else {
                body = JSON.parse(body);
                if(body.online) {
                    status = (body.players.now || '0') + ' of ' + body.players.max;
                } else {
                    status = 'offline';
                }
                resolve(status);
            }
        });

    })
}

async function interval() {
    client.user.setPresence({ game: { name: await getStatus() }, status: 'online' })
        .then(console.log)
        .catch(console.error);
}


client.on('message', async message => {
    if (message.content === mcCommand) {
        message.reply(await getStatus());
    }
});
 

keepAlive();
client.login(process.env.BOT_TOKEN);
