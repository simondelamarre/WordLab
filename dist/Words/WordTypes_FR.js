"use strict";
var WordType = (function () {
    function WordType() {
        var _this = this;
        this.adverbes = "Abominablement - abondamment - d'abord - abruptement - absolument - abstraitement - abusivement - admirablement - accessoirement - accidentellement - acquiescement - activement - actuellement - adagio - adjectivement - admirablement - admirativement - adorablement - adroitement - adverbialement - affectueusement - affirmativement - affreusement - agilement - agr\u00E9ablement - agressivement - aigrement - ailleurs - aimablement - ainsi - ais\u00E9ment - \u00E0 l'exc\u00E8s - al\u00E9atoirement - alentour - alertement - alg\u00E9briquement - alias - all\u00E8grement - allegretto - allegro - allusivement - alors - alphab\u00E9tiquement - alternativement - ambitieusement - am\u00E8rement - amicalement - amoroso - amoureusement - analogiquement - anarchiquement - anciennement - andante - andantino - ang\u00E9liquement - annuellement - anonymement - anormalement - ant\u00E9rieurement - anxieusement - \u00E0 peine - \u00E0 peu pr\u00E8s - apparemment - approximativement - apr\u00E8s - apr\u00E8s - demain - arbitrairement - ardemment - arri\u00E8re - artificiellement - artisanalement - artistiquement - assez - assez bien - assid\u00FBment - assur\u00E9ment - astucieusement - atrocement - attentivement - aucunement - audacieusement - au - dedans - au - dehors - au - del\u00E0 - au - dessous - au - dessus - au - devant - aujourd'hui - auparavant - aupr\u00E8s - aussi - aussit\u00F4t - autant - automatiquement - autoritairement - autour - autrefois - autrement - avant - avantageusement - avant-hier - aveugl\u00E9ment - avidement.\n    B\u00E2illement - banalement - banco - bas - bassement - b\u00E9atement - beaucoup - b\u00E9n\u00E9volement - bestialement - b\u00EAtement - bien - assez bien - bient\u00F4t - bigrement - bilat\u00E9ralement - bis - bizarrement - bon - bougrement - bourgeoisement - bravement - bref - bri\u00E8vement - brillamment - brusquement - brutalement - bruyamment.\n    \u00C7\u00E0 - calmement - candidement - capricieusement - carr\u00EAment - cat\u00E9goriquement - cavali\u00E8rement - c\u00E9ans - cependant - c\u00E9r\u00E9monieusement - certainement - certes - chaleureusement - charitablement - charnellement - chastement - chaudement - ch\u00E8rement - chichement - chimiquement - chr\u00E9tiennement - chronologiquement - ci - cinqui\u00E8mement - civilement - clairement - clandestinement - classiquement - cliniquement - collectivement - combien - comme - comment - commercialement - commod\u00E9ment - commun\u00E9ment - comparativement - compl\u00E8tement - concr\u00E8tement - concurremment - confidentiellement - confortablement - confus\u00E9ment - conjointement - conjugalement - consciemment - consciencieusement - cons\u00E9quemment - consid\u00E9rablement - constamment - constitutionnellement - continuellement - contin\u00FBment - contre - convenablement - convulsivement - copieusement - coquettement - cordialement - correctement - corr\u00E9lativement - courageusement - couramment - courtoisement - craintivement - cr\u00E2nement - crescendo - criminellement - cruellement - curieusement - cyniquement.\n     D'abord - dangereusement - davantage - debout - de\u00E7\u00E0 - d\u00E9cemment - d\u00E9cid\u00E9ment - d\u00E9daigneusement - dedans - d\u00E9favorablement - d\u00E9fectueusement - d\u00E9finitivement - dehors - d\u00E9j\u00E0 - d\u00E9lib\u00E9r\u00E9ment - d\u00E9licatement - d\u00E9licieusement - demain - d\u00E9mesur\u00E9ment - demi - d\u00E9mocratiquement - depuis - d\u00E9raisonnablement - derechef - derni\u00E8rement - derri\u00E8re - d\u00E9sagr\u00E9ablement - d\u00E9sesp\u00E9r\u00E9ment - d\u00E9sormais - dessous - dessus - deuxi\u00E8mement - devant - d\u00E9votement - diablement - diaboliquement - diam\u00E9tralement - diff\u00E9remment - difficilement - diffus\u00E9ment - dignement - diplomatiquement - directement - discr\u00E8tement - distinctement - distraitement - diversement - divinement - dixi\u00E8mement - doctement - dogmatiquement - donc - dor\u00E9navant - doublement - doucement - doucereusement - doucettement - douillettement - dramatiquement - dr\u00F4lement - dubitativement - d\u00FBment - durablement - durement - dynamiquement.\n    \u00C9conomiquement - effectivement - efficacement - effront\u00E9ment - effroyablement - \u00E9galement - \u00E9lectriquement - \u00E9l\u00E9gamment - elliptiquement - \u00E9logieusement - \u00E9minemment - emphatiquement - empiriquement - encore - \u00E9nergiquement - enfin - \u00E9norm\u00E9ment - ensemble - ensuite - enti\u00E8rement - entre - temps - environ - \u00E9perdument - \u00E9pisodiquement - \u00E9pouvantablement - \u00E9quitablement - essentiellement - est - ce - que - esth\u00E9tiquement - \u00E9ternellement - \u00E9tonnamment - \u00E9tourdiment - \u00E9tourdissement - \u00E9trangement - \u00E9troitement - \u00E9tymologiquement - \u00E9vasivement - \u00E9ventuellement - \u00E9videmment - exactement - exag\u00E9r\u00E9ment - \u00E0 l'exc\u00E8s - excellemment , exceptionnellement - excessivement - exclusivement - exemplairement - exhaustivement - exp\u00E9rimentalement - explicitement - expr\u00E8s - express\u00E9ment - ext\u00E9rieurement - extraordinairement - extr\u00EAmement.\n    Fabuleusement - f\u00E2cheusement - facilement - facultativement - faiblement - fameusement - famili\u00E8rement - fanatiquement - fantastiquement - farouchement - fatalement - faussement - fautivement - favorablement - f\u00E9brilement - fermement - f\u00E9rocement - fictivement - fid\u00E8lement - fi\u00E8rement - fi\u00E9vreusement - finalement - financi\u00E8rement - finement - fiscalement - follement - fonci\u00E8rement - fondamentalement - forc\u00E9ment - formellement - formidablement - fort - fortement - fortissimo - fortuitement - fougueusement - fra\u00EEchement - franchement - franco - fraternellement - frauduleusement - fr\u00E9n\u00E9tiquement - fr\u00E9quemment - frileusement - frivolement - froidement - fructueusement - fugitivement - furieusement - furtivement - futilement.\n    Gaiement - gaillardement - galamment - gauloisement - g\u00E9n\u00E9ralement - g\u00E9n\u00E9reusement - g\u00E9n\u00E9tiquement - gentiment - globalement - glorieusement - gloutonnement - gorge - de - pigeon - goul\u00FBment - gracieusement - graduellement - grandement - graphiquement - grassement - gratis - gratuitement - grossi\u00E8rement - gu\u00E8re.\n    Habilement - habituellement - haineusement - hardiment - hargneusement - harmonieusement - h\u00E2tivement - hebdomadairement - h\u00E9r\u00E9ditairement - herm\u00E9tiquement - h\u00E9ro\u00EFquement - heureusement - hideusement - hier - hi\u00E9rarchiquement - historiquement - honn\u00EAtement - horizontalement - horriblement - hostilement - huiti\u00E8mement - humainement - humblement - hypocritement.\n    Ici - idem - ignoblement - ill\u00E9galement - ill\u00E9gitimement - illico - illogiquement - illusoirement - immanquablement - imm\u00E9diatement - immens\u00E9ment - immod\u00E9r\u00E9ment - immuablement - imparfaitement - impassiblement - impatiemment - impeccablement - imp\u00E9rativement - imperceptiblement - imp\u00E9rialement - imp\u00E9rieusement - impersonnellement - imperturbablement - imp\u00E9tueusement - impitoyablement - implacablement - impoliment - improprement - impromptu - imprudemment - impudemment - impulsivement - impun\u00E9ment - incessamment - incidemment - inclusivement - incomparablement - incognito - incompl\u00E8tement - inconditionnellement - inconfortablement - incongr\u00FBment - inconsciemment - inconsid\u00E9r\u00E9ment - incontestablement - incorrectement - incorrigiblement - incroyablement - ind\u00E9cemment - ind\u00E9finiment - ind\u00E9niablement - ind\u00E9pendamment - indiff\u00E9remment - indignement - indirectement - indiscr\u00E8tement - indiscutablement - indissolublement - indistinctement - individuellement - indolemment - indubitablement - ind\u00FBment - industriellement - inefficacement - in\u00E9galement - in\u00E9l\u00E9gamment - in\u00E9luctablement - in\u00E9puisablement - in\u00E9vitablement - inexactement - inexorablement - inexplicablement - inextricablement - infailliblement - infatigablement - infid\u00E8lement - infiniment - inflexiblement - infra - infructueusement - ing\u00E9nieusement - ing\u00E9nument - inhumainement - iniquement - initialement - injustement - innocemment - inopin\u00E9ment - inopportun\u00E9ment - insensiblement - ins\u00E9parablement - insidieusement - insolemment - instamment - instantan\u00E9ment - instinctivement - insuffisamment - intarissablement - int\u00E9gralement - intellectuellement - intelligemment - intelligiblement - intens\u00E9ment - intensivement - intentionnellement - int\u00E9rieurement - interminablement - intimement - intransitivement - intr\u00E9pidement - intrins\u00E8quement - intuitivement - inutilement - invariablement - inversement - invinciblement - involontairement - invraisemblablement - ironiquement - irr\u00E9ductiblement - irr\u00E9futablement - irr\u00E9guli\u00E8rement - irr\u00E9m\u00E9diablement - irr\u00E9parablement - irr\u00E9prochablement - irr\u00E9sistiblement - irrespectueusement - irr\u00E9v\u00E9rencieusement - irr\u00E9versiblement - irr\u00E9vocablement - item.\n    Jadis - jalousement - jamais - joliment - journellement - judiciairement - judicieusement - juridiquement - justement.\n    L\u00E0 - l\u00E0 - bas - laborieusement - laconiquement - l\u00E0 - haut - laidement - lamentablement - langoureusement - largement - lascivement - lat\u00E9ralement - l\u00E9gitimement - lentement - lestement - lib\u00E9ralement - librement - lin\u00E9airement - lisiblement - litt\u00E9rairement - litt\u00E9ralement - localement - logiquement - loin - longtemps - longuement - lors - lourdement - lucidement - lugubrement - lumineusement - luxueusement.\n    Machinalement - magiquement - magistralement - magnanimement - magnifiquement - maigrement - maintenant - majestueusement - majoritairement - mal - pas mal - maladivement - maladroitement - malais\u00E9ment - malencontreusement - malheureusement - malhonn\u00EAtement - malicieusement - malignement - malproprement - manifestement - manuellement - marginalement - mat\u00E9riellement - maternellement - math\u00E9matiquement - m\u00E9chamment - m\u00E9dicalement - m\u00E9diocrement - m\u00E9lancoliquement - m\u00E9lodieusement - m\u00EAme - mensuellement - mentalement - merveilleusement - mesquinement - m\u00E9taphoriquement - m\u00E9thodiquement - m\u00E9ticuleusement - mielleusement - mieux - militairement - minutieusement - miraculeusement - mis\u00E9rablement - moderato - modestement - moindrement - moins - mollement - mondialement - monstrueusement - moralement - mordicus - morphologiquement - mortellement - moyennement - m\u00FBrement - musicalement - mutuellement - myst\u00E9rieusement - mystiquement.\n    Na\u00EFvement - nagu\u00E8re - naturellement - ne - n\u00E9anmoins - n\u00E9cessairement - n\u00E9gativement - n\u00E9gligemment - neuvi\u00E8mement - niaisement - noblement - nominalement - nominativement - nomm\u00E9ment - non - nonchalamment - normalement - notablement - notamment - notoirement - notoirement - nouvellement - nuitamment - nullement - num\u00E9riquement.\n    Objectivement - obligatoirement - obligeamment - obliquement - obscur\u00E9ment - obs\u00E9quieusement - obstin\u00E9ment - oc - occasionnellement - officiellement - officieusement - o\u00EFl - oisivement - onzi\u00E8mement - opini\u00E2trement - opportun\u00E9ment - oralement - ordinairement - ores - organiquement - orgueilleusement - originairement - originellement - ostensiblement - o\u00F9 - oui - outrageusement - outre - ouvertement.\n    Pacifiquement - partant - pas - \u00E0 peine - paradoxalement - parall\u00E8lement - parcimonieusement - pareillement - paresseusement - parfaitement - parfois - partiellement - particuli\u00E8rement - partiellement - partout - pas - pas mal - passablement - passag\u00E8rement - passionnellement - passionn\u00E9ment - passivement - paternellement - path\u00E9tiquement - patiemment - pauvrement - p\u00E9cuniairement - p\u00E9jorativement - p\u00E9niblement - pensivement - p\u00E9remptoirement - perfidement - p\u00E9riodiquement - pernicieusement - perpendiculairement - perp\u00E9tuellement - personnellement - pertinemment - pesamment - petitement - peu - un peu - peureusement - peut - \u00EAtre - philosophiquement - phon\u00E9tiquement - pi\u00E8trement - pieusement - pis - piteusement - pitoyablement - placidement - plaintivement - plaisamment - platement - pleinement - plus - plut\u00F4t - point - poliment - politiquement - pompeusement - ponctuellement - populairement - pos\u00E9ment - positivement - post\u00E9rieurement - potentiellement - pourquoi - pourtant - poussivement - pratiquement - pr\u00E9alablement - pr\u00E9cairement - pr\u00E9cautionneusement - pr\u00E9c\u00E9demment - pr\u00E9cieusement - pr\u00E9cipitamment - pr\u00E9cis\u00E9ment - pr\u00E9cocement - pr\u00E9matur\u00E9ment - premi\u00E8rement - pr\u00E8s - pr\u00E9sentement - presque - prestement - prestissimo - presto - pr\u00E9tendument - pr\u00E9tentieusement - pr\u00E9ventivement - primitivement - primo - princi\u00E8rement - principalement - prioritairement - probablement - prochainement - proche - prodigieusement - professionnellement - profond\u00E9ment - progressivement - promptement - pronominalement - proportionnellement - proprement - prou - proverbialement - providentiellement - provisoirement - prudemment - psychologiquement - pudiquement - pu\u00E9rilement - puis - puissamment - purement.\n    Qualitativement - quand ? - quantitativement - quarto - quasi - quasiment - quatorzi\u00E8mement - quatri\u00E8mement - quelque - quelquefois - quelque part - quinzi\u00E8mement - quotidiennement.\n    Radicalement - raisonnablement - rapidement - rarement - rationnellement - r\u00E9cemment - r\u00E9ciproquement - recta - r\u00E9ellement - r\u00E9glementairement - r\u00E9guli\u00E8rement - religieusement - remarquablement - r\u00E9solument - respectivement - respectueusement - r\u00E9troactivement - r\u00E9trospectivement - ridiculement - rigidement - rigoureusement - rituellement - rondement - royalement - rudement.\n    Sacr\u00E9ment - sagement - sainement - salement - sardoniquement - sauvagement - savamment - sch\u00E9matiquement - sciemment - scientifiquement - secondairement - secondement - secr\u00E8tement - secundo - seizi\u00E8mement - s\u00E9lectivement - sempiternellement - sens\u00E9ment - sensiblement - sentencieusement - sentimentalement - septi\u00E8mement - sereinement - s\u00E9rieusement - servilement - seulement - s\u00E9v\u00E8rement - sexuellement - si - silencieusement - simplement - simultan\u00E9ment - sinc\u00E8rement - singuli\u00E8rement - sit\u00F4t - sixi\u00E8mement - sobrement - socialement-- soi - disant-- soigneusement - soit - solennellement - solidement - solitairement - sommairement - somptueusement - sordidement - sottement - soudain - soudainement - souplement - sourdement - sournoisement - souvent - souverainement - soigneusement - sp\u00E9cialement - sp\u00E9cieusement - sp\u00E9cifiquement - spirituellement - splendidement - spontan\u00E9ment - sporadiquement - sportivement - statiquement - st\u00E9rilement - sto\u00EFquement - strictement - studieusement - stupidement - suavement - subitement - subjectivement - subrepticement - substantivement - subtilement - successivement - succinctement - suffisamment - superbement - superficiellement - sup\u00E9rieurement - superstitieusement - supra - supr\u00EAmement - surabondamment - s\u00FBrement - surtout - sus - symboliquement - sym\u00E9triquement - synchroniquement - syst\u00E9matiquement.\n    Tacitement - tant - tant\u00F4t - tard - tardivement - techniquement - tellement - t\u00E9m\u00E9rairement - temporairement - tendancieusement - tendrement - ter - terriblement - tertio - textuellement - th\u00E9\u00E2tralement - th\u00E9oriquement - ti\u00E8dement - timidement - tortueusement - t\u00F4t - totalement - toujours - tout \u00E0 fait-- tout - \u00E0 - fait-- toutefois - traditionnellement - tragiquement - tra\u00EEtreusement - tranquillement - transitivement - transversalement - treizi\u00E8mement - tr\u00E8s - trimestriellement - triomphalement - triplement - tristement - trivialement - troisi\u00E8mement - trompeusement - trop - trop peu - tout - tout \u00E0 fait - tumultueusement - typiquement.\n    Ult\u00E9rieurement - unanimement - uni\u00E8nement - uniform\u00E9ment - unilat\u00E9ralement - uniquement - universellement - un peu - usuellement - utilement.\n    Vachement - vaguement - vainement - valablement - valeureusement - vaniteusement - verbalement - v\u00E9ridiquement - v\u00E9ritablement - \u00E0 verse - verticalement - vertigineusement - vertueusement - vicieusement - victorieusement - vigoureusement - vilainement - vilement - vingti\u00E8mement - violemment - virilement - virtuellement - visiblement - visuellement - vite - voici - voil\u00E0 - volontairement - volontiers - voluptueusement - voracement - vraiment - vraisemblablement - vulgairement.";
        this.haspires = "habileté - habillage - habit - habitacle - habitat - habitude - haleine - hallali - hallucination - haltère	hameçon - harmonie - hebdomadaire - hébergement - hébreu - hectare - hégémonie - hélice - héliogravure - hallucination	hégémonie hélium - hémicycle - hémophile - héraldique - herbe - hérédité - héritage - héroïne - héroïsme	herpès hésitation - hétérogène - hippique - histoire - homme - horodateur - huissier - hypoténuse - hâblerie - hâbleur/euse - hachage - hache - haché/e - hache-viande - hache-légumes - hache-paille - hachement - hacher - hachette - hacheur - hachis - hachisch - hachoir - hachure - hachurer - hackle - hadal/e/aux - haddock - haflinger - hafnium - hagard - haggis - haie - haillon - haillonneux/euse - haine - haineusement - haineux/euse - haïr - haire - haïssable - Haïtien/enne - halage - hâlage - halal - halbi - halbran - halbrené/e - halde - hâle - hâlé/e - hale-bas - hale-breu - hale-croc - halefis - hâle-haut - haler - hâler - haletant - halètement - haleter - haleur/euse - half-track - hall - halle - hallebarde - halo - hallux - halte - halte-garderie - hamac - hamada - hamburger - hameau - hamman - hampe - hamster - hanche - hanchement - hancher - hand-ball - handballeur/euse - handicap - handicapant/e - handicapé/e - handicaper - handicapeur - handisport - hangar - hanneton - hanon - hanse - hanter - hantise - happement - happening - happer - happy end - haque - haquenée - haquet - hara-kiri - harangue - haranguer - harangueur/euse - haras - harassant/e - harassé/e - harassement - harasser - harcelant/e - harcèlement - harceler - hard - hard-bop - hard-core - harde - hardé - hard-edge - harder - hardes - hard ground - hardi/e - hardiesse - hardiment	hard-rock - hard-top - hardware - harem - hareng - harengade - harengaison - harengère - harenguet - harengueux - harenguier - harenguière - haret - harfang - hargne - hargneusement - hargneux/euse - haricot - haridelle - harissa - harka - harki - harnachement - harnacher - harnais - harnat - harnois - haro - harouelle - harpail - harpaye - harpe - harpe-cithare - harpette - harpie - harpiste - harpe-luth - harpocéras - harpodon - harpoise - harpon - harponnage - harponnement - harponner - harponneur - harpye - harrier - hart - hasard - hasarder - hasardeusement - hasardeux/euse - has been - hasch - haschisch - hase - hâte - hâter - hatha-yoga - hâtier - hâtif/ive - hattéria - hauban - haubanage - haubaner - haubert - hausse - hausse-col - haussement - hausser - hausse-repère - haussier - haussière - haut/e - hautain - hautain/e - haut-bar - hautbois - hautboïste - haut-commissaire - haut-commissariat - haut-de-chausse - haut-de-côtelettes - haut-de-côtes - haut-de-forme - haute-contre - hautement - haute-tige - hauteur - haut-fond - haut-fourneau - hautin - haut-jointé/e - haut-le-cœur - haut-le-corps - haut-le-pied - haut-parc - haut-parleur - haut-relief - hauturier/ère - havage - havane - hâve - havée - haveneau - havenet - haver - haveur - haveuse - havre - havresac - havrit - haylage - hayon - hé ! - heat-set - heaume	hein ! - héler - hem ! - henné - hennin - hennir - hennissant/e - hennissement - hennuyer - hep ! - héraut - hère - hérissé/e - hérissement - hérisser - hérisson - hérissonne - herniaire - hernie - hernié/e - hernieux/euse - héron - héronneau - héronnier/ère - héros - héros/oïne - hersage - herse - herser - hersillon - hêtraie - hêtre - heu ! - heurt - heurter - heurtoir - hibou - hic - hickory - hideur - hideusement - hideux/se - hiement - hiérarchie - hiérarchique - hiérarchiquement - hiérarchisation - hiérarchiser - hiérarque - hi-fi - high bulk - high-tech - hilaire - hile - hindi - hip ! - hip-hop - hippie - hippy - hidjab - hissage - hit - hit-parade - ho ! - hobby - hobbyste - hobereau - hochement - hochepot - hochequeue - hocher - hochet - hockey - hockeyeur/euse - holding - ho! hisse! - holà ! - holding - hold-up - hollandite - hollywoodien/enne - homard - homarderie - homardier - home - home-trainer - hongre - hongrer - hongreur/euse - hongroierie - hongroyage - hongroyer - hongroyeur - honning - honnir - honoris causa - honte - honteusement - honteux/euse - hooligan - hooliganisme - hop ! - hop-je - hoquet - hoqueter - hoqueton - horde - horion - hormis - hornblende - hors - horsain - horsin - hors-bord - hors-cote - hors de - hors-de-cour	 - hors-d'œuvre - horse-guard - horse power - hors-jeu - hors-la-loi - hors-ligne - hors-marché - hors-piste - hors-texte - horst - hors-statut - hors-texte - hot - hot dog - hot-flue - hotinus - hot money - hotte - hottée - hotu - hou ! - houache - houaiche - houage - houblon - houe - houer - houille - houiller/ère - houillère - houle - houlette - houleux/euse - houligan - hooligan - houliganisme - hooliganisme - houlque - houp ! - houppe - houppelande - houppette - houppier - hourd - hourdage - hourder - hourdir - hourdis - houri - hourque - hourra ! - hourri - hourrite - hourvari - housche - houseau - house-boat - houspiller - houssage - housse - housser - housset - houssière - houst ! - houx - hovéa - hoyau - hoyé/e - huard - huart - hublot - huche - hucher - huchier - hue ! - huée - huer - huerta - huguenot - huipil - huir - huis clos - huit - huitain - huitaine - huitante - huit-en-huit - huitième - huitièmement - huit-reflets - hulotte - hululation - hululement - hululer - hum ! humantin - humer - hune - hunier - hunter - huppe - huppé/e - huque - hurdler - hure - hurlant - hurlement - hurler - hurleur/euse - huron/onne - hurrah ! - hurricane - husky - hussard - hussarde - hutinet - hutte - hutteau";
        this.invariables = "suis - parfois - mais - abats - abois - aboutissants - accointances - accordailles - affres - agapes - agissements - agrès - aguets - ailleurs - albinos - alentours - alluvions - ambages - amourettes - annales - antirides - appas - appointements - appuie-bras - arcanes - archives - armoiries - arrérages - arrhes - arrière-pays - assises - atours - auspices - avant-bras - avant-corps - avant-propos. abattis - Abribus - abcès - abords - Abribus - abus - accès - acquis - actualités - adénovirus - adonis - affaires - afrikaans - aides - airs - albatros - alias (adv) - aloès - amaryllis - amas - amitiés - ampélopsis - ans - anans - ancêtres - anchois - angélus - anis - antécédents - anthémis - anticorps - antihéros - anus - à-peu-près - après (prép) - à-propos - appentis - appui-bras - arènes - argus - armes - arrêts - un as - ascaris - ascendants - asparagus - atlas - attaches - attributions - aurochs - autobus - autofocus - autorités - autrefois (adv) - avances - avant-propos - avers - avis - axis.     babines - bacchantes (fam) - balayures, beaux-arts - beaux-parents - belles-lettres - bésicles ou besicles - biosciences - blockhaus - boots - bouts-rimés - braies, branchies - branle-bas - brisées - brise-lames - brise-mottes - brucelles .   bains - barbouillis, barres - bas - bas-fonds - batteries - bavardages - beaujolais - belligérants - besoins - bêtes - biais - bibliobus - biceps - bicross - bien-fonds - binocles (fam) - bloc-notes - blocus - blues - bois - bonus - bornes - bouches - boules - bourses - bout-dehors - branchages - bras - brebis - bris - brûlis - buis - burnous - bus (fam) - business (fam).    calendes - casse-noisettes - casse-pieds - castagnettes - catacombes - chauffe-assiettes - chausses - cisailles - claquettes - clopinettes - complies - compte-gouttes - compte-tours - condoléances - confins - coordonnés - corn flakes - corps-à-corps - cotillons - coupe-ongles - courbis - cure-dents - cure-ongles - cure-pipes - cyclo-cross.   cabas - cacatoès ou kakatoès - cacatois - cactus - cadenas - cafouillis (fam) - caillebotis - calvados - cambouis - campus - canevas - cannabis - caprices - carquois - cas - cassis - caucus - céans (adv) - cendres - cens - céréales - certes (adv) - cervelas - chablis - chaînes - chaleurs - chamois - champs - chances - chas - chaos - chasselas - châssis - chatouillis (fam) - chauve-souris - cheval-arçons - cheval-d'arçons - chinoiseries (fam) - chips - chorus - choses - choucas - chromes - cintres - circoncis - cirrus - civilités - clapotis - cliquetis - clos - cochylis - codes - code-barres - colis - coloris - commis - commissions - communs - compas - compromis - compte-chèques - concours - congrès - connaissances - consensus - consorts - contingences - contrepoids - contresens - contretemps - contributions - convenances - conventions - coordonnées - cordes - corps - corpus - cosinus - cosmos - couches - couleurs - coulis - coulisses - cours - courses - couscous - coutelas - crasses - crocus - croquis - cross - crudités - cubitus - cuivres - cumulus - curiosités - cursus - cycles - cyclo-cross - cyprès.    décombres - delirium tremens - demi-gros - dépens - de profundis - desiderata - deux-mâts - deux-pièces - deux-points - deux-roues - deux-temps - doléances - dragonnades.   dais - damas - débarras - déblais - débours - débris - débuts - décès - déchirements - dehors (adv) - délices - deniers - dépendances - dépouilles - de profundis - descendants - désormais (adv) - dessous, dessus - détritus - devis - devoirs - dévotions - difficultés - diplodocus - dirigeants - discours - disponibilités - dispositions - dominos - dommages - données - dos - douceurs - dures .    ébats - échecs - économies - écritures - écrouelles - embruns - émoluments - en-cas - entrailles - entre-deux-guerres - entrefaites - environs - épluche-légumes - épousailles - errements - essuie-mains - êtres - ex-libris.   éboulis - échalas - échelles - edelweiss - effets - égards - éleis - élaeis - éléments - éléphantiasis - élites - embarras - empois - empreintes - encens - enclos - endos - engrais - entrées - entrelacs - entremets - envers - éphémérides - épinards - ers - espace-temps - espèces - études - eucalyptus - européennes - événements - exactions - excès - excuses - express - extérieurs - extrados, extrémités .    faux-sens - favoris - fèces - félicitations - festivités - fonts - frais - fiançailles - floralies - frusques (fam) - funérailles.   faciès - fait-divers - fatras - faveurs - fêtes - ficus - fier-à-bras - finances - finnois - fleurs - florès - flûtes - focus - fœtus - fois - fondations - fonds - forces - forceps - formes - foudres - fouillis - foyers - fracas - français - franglais - frimas - fringues - friselis - frisottis - froncis - frottis - fruits - fucus - fumées .     gages - garde-à-vous - garde-corps - gâte-bois - gémonies - gens - gobe-mouches - grands-parents - gravats.   gâchis - galères - galetas - galimatias - gardes - garde-côtes - garde,meubles - gargouillis - gars - gazouillis - généralité";
        this.nomCommunsMasculins = 'abaque - abîme - abysse - acabit - acolyte - acrostiche - adage - aéronef - aéroplane - âge - agent - agrume - alambic - albâtre - alcool - amadou - amalgame - ambre - amiante - anathème - anchois - andante - anévrisme - ange - anniversaire - anthracite - antidote - antipode - antre - apanage - aphte - apogée - apologue - appendice - aqueduc - arcane - architecte - are - aréopage - argent - armistice - aromate - arôme - arpège - artifice - asile - asphalte - assesseur - astérisque - asthme - astragale - atome	augure - auspices - autoclave - autographe - automate - axiome - balustre - basilic - bastringue - box - bulbe - camée - camélia - campanile - capitule - capuce - centime - cèpe - cerne - chambranle - chistera - chrysanthème - cloporte - codicille - colchique - concombre - conifère - corpuscule - décombres - échange - éclair - écrivain - édicule - effluve - élastique - éloge - emblème - emplâtre - en-tête - entracte - éphémère - épiderme - épilogue - épisode - équilibre - équinoxe - érysipèle - esclandre - escompte - évangile - éventail - exemple	exergue - exode - exorde - fastes - fuchsia - girofle - globule - glucose - habit - globule - gourmet - granule - haltère - harmonica - hectare - hémisphère - hémistiche - hiéroglyphe - holocauste - horoscope - hospice - hyménée - hypogée - ilote - indice - insigne - interclasse - intermède - interrogatoire - interstice - intervalle - isthme - ivoire - jade - jaspe - jute - lange - légume - leurre - libelle - lignite - limbe - lobule - lombes - losange - mânes - mannequin - mausolée - méandre - météore - monticule - myrte	naphte - narcisse - neurone - nimbe - obélisque - obstacle - omnibus - ongle - opéra - opercule - opprobre - opuscule - orchestre - organe - orifice - ouvrage - ovale - ovule - ozone - pagne - parafe - paraphe - pastiche - pénates - périgée - pétale - pilastre - pipeline - planisphère - pore - poulpe - prêche - quinconce - quine - rifle - salamalecs - sépale - sévices - simple - tentacule - termite - trille - triqueballe - trophée - tubercule - tulle - ulcère - uretère - ustensile - vestige - viscère - vivres';
        this.nomCommunsFeminins = 'abside - absinthe - acné - acoustique - acre - aérogare - affres - agora - agrafe - alarme - alcôve - algèbre - alluvions - altesse - amibe - ammoniaque - amnistie - amorce - amulette - anagramme - ancre - anicroche - ankylose - anse - antichambre - apostille - apostrophe - apothéose - arabesque - argile - arrhes - artère - astuce - atmosphère - attache - autoroute - autostrade - avant-scène	azalée - Bakélite - besicles - campanule - canaille - câpre - caténaire - clovisse - congère - coquecigrue - cuiller - dartre - décalcomanie - drachme - dupe - dynamo - ébène - ébonite - écarlate - ecchymose - échappatoire - écharde - écritoire - égide - encaustique - enclume - énigme - entrecôte - enzyme - éphéméride - épigramme - épigraphe - épitaphe - épithète - épître - équerre - équivoque - escarre	esquille - estafette - estompe - extase - garbure - gemme - gîte - glaire - hécatombe - horloge - hydre - icône - idole - idylle - immondices - impasse - imposte - insulte - interview - intrigue - mandibule - météorite - molécule - montgolfière - moufle - mousson - moustiquaire - myrtille - nacre - oasis - obsèques - ocre - octave - omoplate - once - opale - optique - orbite	orge - oriflamme - orthographe - ouïe - outre - palabre - panacée - patenôtres - patère - perce-neige - périssoire - phalène - piastre - prémices - primeur - primevère - pulpe - réglisse - saga - scolopendre - scorsonère - sentinelle - sépia - spore - stalactite - stalagmite - stèle - ténèbres - topaze - trémie - urticaire - vêpres - vésicule - vicomté - vigogne - virago - vis - volte-face';
        this.interjections = "Ah ! - Adieu ! - Ah ! - Ah, çà ! - Ah mais ! - Aie ! - Alerte ! - Allez ! - Allons ! - Assez ! - Allô ! - Arrière ! - Atchoum ! - Attention ! - Bah ! - Au secours ! - Barbe ! - Basta ! - Bernique ! - Bigre ! - Bis ! - Bof ! - Bon ! - Bougre ! - Boum ! - Bravissimo ! - Bravo ! - Brrr ! - Çà ! - Chic ! - Chiche ! - Chouette ! - Chut ! - Ciao ! - Ciel ! - Clic !  - Comment ! - Corbleu ! - Coucou ! - Courage ! - Crac ! - Cric ! - Da ! - Dame ! - Damnation ! - Debout ! - Diable ! - Dia ! - Diantre ! - Dieu ! - Diantre ! - Ding ! - Dommage ! - Drelin - Dring ! - Eh ! - Eh bien ! - Enfin! - Euh ! - Euréka ! - Fi ! - Fichtre ! - Fixe - Flac - Floc ! - Flûte ! - Foin ! - Fouchtra ! - Funérailles ! - Gai ! - Gare !  - Gare à vous ! - Grâce ! - Ha ! - Haïe ! - Hallali ! - Halte ! - Halte-là ! - Han ! - Hardi ! - Haro ! - Hé ! - Hein ! - Hélas ! - Hello ! - Hem ! - Hep ! - Eh quoi ! - Heu ! - Ho ! - Holà ! - Hop ! - Hosanna ! - Hou ! - Houp ! - Hourra ! - Hue ! - Hum ! - Hurrah ! - Idiot ! - Là ! - Las ! - Malheur ! - Merci ! - Miam-miam ! - Minute ! - Mince !  - Morbleu ! - Motus ! - Na ! - Ô ! - Oh ! - Ohé ! - Olé ! - Ouais ! - Ouf ! - Ouïe ! - Ouille ! - Oust ! - Ouste ! - Paf ! - Paix ! - Pan ! - Parbleu ! - Pardi ! - Pardieu ! - Patapouf ! - Patatras ! - Pécaïre ! - Pechère ! - Peuchère ! - Peuh ! - Pff ! - Pfft ! - Pfut ! - Pif ! - Pin-pon ! - Ploc ! - Plouf ! - Pouah ! - Pouf ! - Présent ! - Psitt !  - Pst ! - Quoi ! - Rataplan ! - Rantanplan ! - Sacrebleu ! - Sacredieu ! - Sacristi ! - Salut ! - Saperlipopette ! - Saperlotte ! - Sapristi ! - Scrogneugneu ! - Silence ! - Sniff ! - Stop ! - Suffit ! - Tac ! - Taïaut ! - Taratata ! - Tayaut ! - Tchao ! - Tintin ! - Toc ! - Tonnerre ! - Tudieu ! - Turlututu ! - Ventrebleu ! - Vertubleu ! - Vertuchou ! - Vertudieu ! - Vite ! - Vivat ! - Vive ! - Vlan ! - Zou ! - Zut ! Locutions interjectives  - À d'autres ! - À la bonne heure ! - Ah ! là! là ! - A la tienne ! - Allons donc ! - Alors quoi ! - A quoi bon ! - Bon courage ! - Bonne Mère ! - Bon sang !	- Bon sang ! - Bonté de Dieu ! - Bonté divine ! - Bonté du ciel ! - Ça suffit ! - C'en est assez ! - C'est assez ! - Dis donc ! - Eh bien ! - Enfer et damnation !	- En avant ! - En voilà assez ! - Et tac ! - Et toc ! - Fi donc ! - Fouette cocher ! - Gare à la bombe ! - Grand Dieu ! - Hé bien !	- Hé là ! - Hop là ! - Juste ciel ! - Là, là ! - La ferme ! - La paix ! - Ma foi ! - Ma parole ! - Mon Dieu ! - Nom d'une pipe !	- Nom d'un chien ! - Nom d'un petit bonhomme ! - Par exemple ! - Tant pis ! - Tchin-tchin ! - Tonnerre de Dieu ! - Tu vois ! - Vogue la galère !";
        this.preprositions = [
            'je',
            'tu',
            'il',
            'nous',
            'vous',
            'ils',
            'elles',
            'ont',
            'à',
            'les',
            'la',
            'le',
            'pas',
            'des',
            'une',
            'unes',
            'est',
            'son',
            'sa',
            'ses',
            'aux',
            'car',
            'et',
            'que',
            'qui',
            'quoi',
            'quand',
            'comment',
            'après',
            'avant',
            'avec',
            'chez',
            'contre',
            'dans',
            'de',
            'derrière',
            'devant',
            'en',
            'entre',
            'excepté',
            'malgré',
            'moyennant',
            'outre',
            'par',
            'parmi',
            'passé',
            'pendant',
            'pour',
            'sans',
            'sauf',
            'selon',
            'sous',
            'suivant',
            'sur',
            'vers',
            'vu',
            'entre',
            'sans',
        ];
        this.properName = function (str) { return /[A-Z]/.test(str[0]); };
        this.properFullName = function (str, next) { return /[A-Z]/.test(str[0]) && /[A-Z]/.test(next[0]); };
        this.feelImportant = function (str) { return str[0].match(/[A-Z]/g); };
        this.isHaspire = function (str) { return _this.haspires.split(' - ').includes(str); };
        this.isInvariable = function (str) { return _this.invariables.split(' - ').includes(str); };
        this.isAdverbe = function (str) { return _this.invariables.split(' - ').includes(str); };
        this.isPreprosition = function (str) { return _this.preprositions.includes(str.toLowerCase()); };
        this.cleanStr = function (str) {
            return str
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/[,:;"'’،、…⋯‘’“”""«»()+-=%[{}¿?!.]/g, ' ')
                .replace(/\n/g, ' ');
        };
        this.getCoefficient = function (str, next) {
            if (next)
                if (_this.properFullName(str, next))
                    return 5;
            if (_this.feelImportant(str))
                return 5;
            if (_this.properName(str))
                return 4;
            if (_this.nomCommunsFeminins.indexOf(str) !== -1)
                return 3;
            if (_this.nomCommunsMasculins.indexOf(str) !== -1)
                return 3;
            if (_this.adverbes.indexOf(str) !== -1)
                return 1;
            return 1;
        };
    }
    return WordType;
}());
module.exports = WordType;
