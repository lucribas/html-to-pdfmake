
var path = require("path");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("./index.js");
const { Readable } = require('stream');
var deasync = require("deasync");
//var util = require("util");

const images = [
    './imgs/20211019-FanalMadeira_ROW0862209086_UHD.jpg',
    './imgs/20211028-UnkindnessRavens_ROW8093844885_UHD.jpg',
    './imgs/20211121-Invergarry_ROW8999922770_UHD.jpg',
    './imgs/20220224-CrystalCave_ROW2601921907_UHD.jpg',
    './imgs/20220330-TofinoOcean_ROW2686133233_UHD.jpg',
    './imgs/20220728-LongsPeak_PT-BR1847725385_UHD.jpg',
    './imgs/20220811-MtTsubakuro_PT-BR4172492131_UHD.jpg',
    './imgs/20220831-BlueLinckia_PT-BR4801918964_UHD.jpg',
    './imgs/20220920-SitkaOtters_PT-BR8466489649_UHD.jpg',
    './imgs/20221213-InstagramHallstatt_PT-BR7899105457_UHD.jpg',
    './imgs/20230407-KitsAspen_PT-BR8299899730_UHD.jpg',
    './imgs/20230427-SouthPadre_PT-BR5387043078_UHD.jpg',
    './imgs/20230525-SaksunFaroe_PT-BR6443520957_UHD.jpg',
    './imgs/20230621-StonehengeSalisbury_PT-BR7064860081_UHD.jpg',
    './imgs/20230630-ClamBears_PT-BR5661111850_UHD.jpg',
    './imgs/20230801-DenaliClimber_PT-BR1512476985_UHD.jpg',
    './imgs/20230905-MountSegla_PT-BR1076909696_UHD.jpg',
    './imgs/20240808-SpottedOwlet_PT-BR0320206589_UHD.jpg',
    './imgs/20240923-IcebergOtter_PT-BR0553443956_UHD.jpg',

    // './BingWallpaper/20210827-FlintstoneHouse_ROW5396329351_UHD.jpg',
    // './BingWallpaper/20210828-Mpumalanga_ROW5613071248_UHD.jpg',
    // './BingWallpaper/20210829-Ruskeala_ROW5758462192_UHD.jpg',
    // './BingWallpaper/20210830-MayonVolcano_ROW5913000756_UHD.jpg',
    // './BingWallpaper/20210831-DjurdjevicaBridge_ROW6129714206_UHD.jpg',
    // './BingWallpaper/20210901-Porcini_ROW6279379651_UHD.jpg',
    // './BingWallpaper/20210902-PortoFlavia_ROW7513099649_UHD.jpg',
    // './BingWallpaper/20210903-AlienEggs_ROW7646728253_UHD.jpg',
    // './BingWallpaper/20210904-AnnasHummingbird_ROW7858152533_UHD.jpg',
    // './BingWallpaper/20210905-GCVenice_ROW8032002419_UHD.jpg',
    // './BingWallpaper/20210906-HowgillFells_ROW8322212317_UHD.jpg',
    // './BingWallpaper/20210907-MassachusettsHumpbacks_ROW8421046943_UHD.jpg',
    // './BingWallpaper/20210908-Riou_ROW8685237154_UHD.jpg',
    // './BingWallpaper/20210909-SanJuanIslands_ROW8838197677_UHD.jpg',
    // './BingWallpaper/20210910-JaneAusten_ROW2101083629_UHD.jpg',
    // './BingWallpaper/20210911-HainichBaumwipfelpfad_ROW2218515953_UHD.jpg',
    // './BingWallpaper/20210912-TombstoneYukon_ROW2602873808_UHD.jpg',
    // './BingWallpaper/20210913-VeniceBeach_ROW2797758131_UHD.jpg',
    // './BingWallpaper/20210914-Aldeyjarfoss_ROW2915138519_UHD.jpg',
    // './BingWallpaper/20210915-BirnbeckPier_ROW3072125837_UHD.jpg',
    // './BingWallpaper/20210916-HouseboatKerala_ROW3200482956_UHD.jpg',
    // './BingWallpaper/20210917-BenagilCave_ROW3518725863_UHD.jpg',
    // './BingWallpaper/20210920-BlackSun_ROW4001918217_UHD.jpg',
    // './BingWallpaper/20210921-Autumn_ROW4111709953_UHD.jpg',
    // './BingWallpaper/20210922-BabyRhino_ROW4248213135_UHD.jpg',
    // './BingWallpaper/20210923-BrilliantBlue_ROW4595544215_UHD.jpg',
    // './BingWallpaper/20210924-CuscoCathedral_ROW8168855014_UHD.jpg',
    // './BingWallpaper/20210925-PorkiesTrail_ROW8343655250_UHD.jpg',
    // './BingWallpaper/20210926-MackenzieRiver_ROW8598726501_UHD.jpg',
    // './BingWallpaper/20210927-PicoThorn_ROW8776338699_UHD.jpg',
    // './BingWallpaper/20210928-TheBroads_ROW9507534557_UHD.jpg',
    // './BingWallpaper/20210929-WoodBison_ROW0283650268_UHD.jpg',
    // './BingWallpaper/20210930-ContainerShip_ROW0593218153_UHD.jpg',
    // './BingWallpaper/20211001-HyacinthMacaws_ROW0713544836_UHD.jpg',
    // './BingWallpaper/20211002-IvishakRiver_ROW0821178272_UHD.jpg',
    // './BingWallpaper/20211003-Italica_ROW1028499542_UHD.jpg',
    // './BingWallpaper/20211004-Andromeda_ROW1243133057_UHD.jpg',
    // './BingWallpaper/20211005-BorealQuebec_ROW0647615403_UHD.jpg',
    // './BingWallpaper/20211006-SWColorado_ROW1449692918_UHD.jpg',
    // './BingWallpaper/20211007-HuayMaeKhamin_ROW1580356330_UHD.jpg',
    // './BingWallpaper/20211008-FriendlyOctopus_ROW6799758956_UHD.jpg',
    // './BingWallpaper/20211009-SandhillApache_ROW7467081668_UHD.jpg',
    // './BingWallpaper/20211010-AbaloneShell_ROW8616509074_UHD.jpg',
    // './BingWallpaper/20211011-MauricieAutumn_ROW9848344686_UHD.jpg',
    // './BingWallpaper/20211012-StMalo_ROW0252192060_UHD.jpg',
    // './BingWallpaper/20211014-SaguaroFamily_ROW4350432537_UHD.jpg',
    // './BingWallpaper/20211018-CapelCurig_ROW9050750967_UHD.jpg',
    // './BingWallpaper/20211019-FanalMadeira_ROW0862209086_UHD.jpg',
    // './BingWallpaper/20211020-SmileySloth_ROW1966625631_UHD.jpg',
    // './BingWallpaper/20211022-Neowise_ROW4166842789_UHD.jpg',
    // './BingWallpaper/20211023-ScopsOwl_ROW4397693230_UHD.jpg',
    // './BingWallpaper/20211025-BulgariaDevilBridge_ROW4764578614_UHD.jpg',
    // './BingWallpaper/20211026-RedFoxBlackForest_ROW4892504823_UHD.jpg',
    // './BingWallpaper/20211027-BatterySlopes_ROW8011867983_UHD.jpg',
    // './BingWallpaper/20211028-UnkindnessRavens_ROW8093844885_UHD.jpg',
    // './BingWallpaper/20211029-Dargavs_ROW5383665894_UHD.jpg',
    // './BingWallpaper/20211030-MistyForest_ROW8196004831_UHD.jpg',
    // './BingWallpaper/20211031-NewtonPumpkins_ROW8337512839_UHD.jpg',
    // './BingWallpaper/20211101-LittleBirds_ROW5989976879_UHD.jpg',
    // './BingWallpaper/20211102-CinnamonFernNS_ROW6095744122_UHD.jpg',
    // './BingWallpaper/20211103-MoonJellyDay_ROW6253326538_UHD.jpg',
    // './BingWallpaper/20211104-FoleysBridge_ROW6457536586_UHD.jpg',
    // './BingWallpaper/20211105-PontRouge_ROW9924470311_UHD.jpg',
    // './BingWallpaper/20211106-WANumbat_ROW0070838081_UHD.jpg',
    // './BingWallpaper/20211107-MackArch_ROW0277566288_UHD.jpg',
    // './BingWallpaper/20211108-ChurchillBears_ROW0460367432_UHD.jpg',
    // './BingWallpaper/20211109-DalyanTombs_ROW0649975776_UHD.jpg',
    // './BingWallpaper/20211110-CumberlandSeashore_ROW0923522860_UHD.jpg',
    // './BingWallpaper/20211111-NohsngithiangFalls_ROW1065146529_UHD.jpg',
    // './BingWallpaper/20211112-BeaversBend_ROW1274446883_UHD.jpg',
    // './BingWallpaper/20211113-ElTajo_ROW1825529100_UHD.jpg',
    // './BingWallpaper/20211114-FirstCliff_ROW2054429717_UHD.jpg',
    // './BingWallpaper/20211115-FloridaManatee_ROW2598065927_UHD.jpg',
    // './BingWallpaper/20211116-HogwartsExpress_ROW2897713777_UHD.jpg',
    // './BingWallpaper/20211117-CorkscrewSwamp_ROW3200573760_UHD.jpg',
    // './BingWallpaper/20211118-RameHead_ROW3503611430_UHD.jpg',
    // './BingWallpaper/20211119-LeftForkNorth_ROW1837987250_UHD.jpg',
    // './BingWallpaper/20211120-FallAssiniboine_ROW2134195305_UHD.jpg',
    // './BingWallpaper/20211121-Invergarry_ROW8999922770_UHD.jpg',
    // './BingWallpaper/20211122-IrohazakaRoad_ROW9725977093_UHD.jpg',
    // './BingWallpaper/20211123-AmmoniteShell_ROW0289116591_UHD.jpg',
    // './BingWallpaper/20211124-ChocoHillBohol_ROW0503871776_UHD.jpg',
    // './BingWallpaper/20211125-SquirrelsCairngorms_ROW0740143732_UHD.jpg',
    // './BingWallpaper/20211126-WinterWaxwing_ROW0919039965_UHD.jpg',
    // './BingWallpaper/20211127-ElanValley_ROW1240707723_UHD.jpg',
    // './BingWallpaper/20211128-BeechTrees_ROW1434562441_UHD.jpg',
    // './BingWallpaper/20211129-RainbowMountain_ROW1744297553_UHD.jpg',
    // './BingWallpaper/20211130-ElephantGiving_ROW1927287055_UHD.jpg',
    // './BingWallpaper/20211201-CuvervilleIsland_ROW3179779180_UHD.jpg',
    // './BingWallpaper/20211202-DenaliDall_ROW3399757642_UHD.jpg',
    // './BingWallpaper/20211203-EastbournePier_ROW5329539889_UHD.jpg',
    // './BingWallpaper/20211204-MotherCheetah_ROW4157746718_UHD.jpg',
    // './BingWallpaper/20211206-MistyTor_ROW5578984267_UHD.jpg',
    // './BingWallpaper/20211207-Koenigsbourg_ROW5759997586_UHD.jpg',
    // './BingWallpaper/20211208-PFNPAZ_ROW5933717155_UHD.jpg',
    // './BingWallpaper/20211209-GlowWormBMNP_ROW6135196064_UHD.jpg',
    // './BingWallpaper/20211210-FoxDovrefjell_ROW6307273539_UHD.jpg',
    // './BingWallpaper/20211213-ElPanecilloHill_ROW0950584812_UHD.jpg',
    // './BingWallpaper/20211214-AmericanRobin_ROW1537699506_UHD.jpg',
    // './BingWallpaper/20211215-SantaJusta_ROW2461826140_UHD.jpg',
    // './BingWallpaper/20211216-RhinocerosIndia_ROW9860205237_UHD.jpg',
    // './BingWallpaper/20211217-QuebecFrost_ROW4720977435_UHD.jpg',
    // './BingWallpaper/20211220-QuoichBowl_ROW5212774672_UHD.jpg',
    // './BingWallpaper/20211222-AnnecyFrance_ROW5789300245_UHD.jpg',
    // './BingWallpaper/20220101-JonesBeachHarpSeal_ROW0416716522_UHD.jpg',
    // './BingWallpaper/20220102-SnowyPrague_ROW0715712083_UHD.jpg',
    // './BingWallpaper/20220103-LickObservatory_ROW0938684744_UHD.jpg',
    // './BingWallpaper/20220104-BorregoBadlands_ROW1094720226_UHD.jpg',
    // './BingWallpaper/20220111-PorcupineWillow_ROW2386836074_UHD.jpg',
    // './BingWallpaper/20220112-FanjingStairs_ROW3742684039_UHD.jpg',
    // './BingWallpaper/20220113-TasiilaqAurora_ROW3886118204_UHD.jpg',
    // './BingWallpaper/20220114-SaCalobra_ROW8669762943_UHD.jpg',
    // './BingWallpaper/20220116-BoguraChili_ROW9079381774_UHD.jpg',
    // './BingWallpaper/20220117-RydalWater_ROW9260366963_UHD.jpg',
    // './BingWallpaper/20220118-BurghausenWinter_ROW9393732124_UHD.jpg',
    // './BingWallpaper/20220119-SaintElias_ROW9536248624_UHD.jpg',
    // './BingWallpaper/20220120-GrahamAdelie_ROW9702290855_UHD.jpg',
    // './BingWallpaper/20220121-HuggingDay_ROW0222185853_UHD.jpg',
    // './BingWallpaper/20220122-LesserAntilles_ROW0304452051_UHD.jpg',
    // './BingWallpaper/20220123-MeotoIwa_ROW0427570779_UHD.jpg',
    // './BingWallpaper/20220124-ManhattanView_ROW0535678048_UHD.jpg',
    // './BingWallpaper/20220125-StDwynwensDay_ROW0673958639_UHD.jpg',
    // './BingWallpaper/20220126-MehrangarhCourtyard_ROW0748669466_UHD.jpg',
    // './BingWallpaper/20220127-RibbontailStingray_ROW0847876547_UHD.jpg',
    // './BingWallpaper/20220128-WinteringFowl_ROW4004797885_UHD.jpg',
    // './BingWallpaper/20220131-IncenseFieldVietnam_ROW6606971475_UHD.jpg',
    // './BingWallpaper/20220201-BengalTigerIndia_ROW6729602662_UHD.jpg',
    // './BingWallpaper/20220202-GHDMarmot_ROW9446830858_UHD.jpg',
    // './BingWallpaper/20220203-FortCorjuem_ROW9591224424_UHD.jpg',
    // './BingWallpaper/20220204-SpeloncatoSnow_ROW4998498676_UHD.jpg',
    // './BingWallpaper/20220207-WinterludeIce_ROW2615609916_UHD.jpg',
    // './BingWallpaper/20220208-BaumwipfelpfadSaarschleife_ROW5587664037_UHD.jpg',
    // './BingWallpaper/20220209-SevenSistersCliffs_ROW3098550088_UHD.jpg',
    // './BingWallpaper/20220210-SnowyBern_ROW3267941974_UHD.jpg',
    // './BingWallpaper/20220211-TeaGardensMunnar_ROW0380977650_UHD.jpg',
    // './BingWallpaper/20220212-DarwinsArch_ROW3627993941_UHD.jpg',
    // './BingWallpaper/20220213-FaceOff_ROW3762069272_UHD.jpg',
    // './BingWallpaper/20220214-MaldivesHeart_ROW3978978073_UHD.jpg',
    // './BingWallpaper/20220215-ChengduLanterns_ROW4169717912_UHD.jpg',
    // './BingWallpaper/20220216-CranborneChase_ROW5726872006_UHD.jpg',
    // './BingWallpaper/20220217-RichmondDeer_ROW6671612857_UHD.jpg',
    // './BingWallpaper/20220218-GreatTits_ROW7651804707_UHD.jpg',
    // './BingWallpaper/20220221-SycamoreStars_ROW0313554911_UHD.jpg',
    // './BingWallpaper/20220222-BactrianCamels_ROW1554113163_UHD.jpg',
    // './BingWallpaper/20220223-CypressTunnel_ROW2313095079_UHD.jpg',
    // './BingWallpaper/20220224-CrystalCave_ROW2601921907_UHD.jpg',
    // './BingWallpaper/20220225-WheatonYukon_ROW2815987240_UHD.jpg',
    // './BingWallpaper/20220228-WinterCotswolds_ROW3189235576_UHD.jpg',
    // './BingWallpaper/20220301-ZugspitzeGipfelstation_ROW3363863552_UHD.jpg',
    // './BingWallpaper/20220302-MoonlightRainier_ROW3467884289_UHD.jpg',
    // './BingWallpaper/20220303-RhinocerosUnicornis_ROW3588258444_UHD.jpg',
    // './BingWallpaper/20220304-WeinstadelNuernberg_ROW3668123351_UHD.jpg',
    // './BingWallpaper/20220306-GreatCormorants_ROW3869451596_UHD.jpg',
    // './BingWallpaper/20220307-NZTekapo_ROW4001737494_UHD.jpg',
    // './BingWallpaper/20220308-Mercantour_ROW4112577039_UHD.jpg',
    // './BingWallpaper/20220309-PeacockNagarahole_ROW4255740365_UHD.jpg',
    // './BingWallpaper/20220310-BobbioItaly_ROW4376720847_UHD.jpg',
    // './BingWallpaper/20220311-OcalaNF_ROW0788231337_UHD.jpg',
    // './BingWallpaper/20220312-BrehatIsland_ROW0919651768_UHD.jpg',
    // './BingWallpaper/20220313-SpringForward_ROW1096437918_UHD.jpg',
    // './BingWallpaper/20220314-LanyonQuoit_ROW1211200542_UHD.jpg',
    // './BingWallpaper/20220315-RomanView_ROW1323702523_UHD.jpg',
    // './BingWallpaper/20220316-KuhschelleOberbayern_ROW1437108551_UHD.jpg',
    // './BingWallpaper/20220317-Shamrocks_ROW1605559401_UHD.jpg',
    // './BingWallpaper/20220318-BamfordEdge_ROW3228561444_UHD.jpg',
    // './BingWallpaper/20220319-Chicagohenge_ROW3366621941_UHD.jpg',
    // './BingWallpaper/20220320-WorldFrogDay_ROW3516148150_UHD.jpg',
    // './BingWallpaper/20220321-TheBard_ROW3620086540_UHD.jpg',
    // './BingWallpaper/20220322-ThousandSprings_ROW3791240832_UHD.jpg',
    // './BingWallpaper/20220324-SquirrelNesting_ROW4163004728_UHD.jpg',
    // './BingWallpaper/20220325-Rivendell_ROW1252107647_UHD.jpg',
    // './BingWallpaper/20220326-YellowCrocuses_ROW1420508716_UHD.jpg',
    // './BingWallpaper/20220328-Kawachi_ROW1735483381_UHD.jpg',
    // './BingWallpaper/20220329-Buritaca_ROW2283704520_UHD.jpg',
    // './BingWallpaper/20220330-TofinoOcean_ROW2686133233_UHD.jpg',
    // './BingWallpaper/20220331-AnniEiffel_ROW3307325015_UHD.jpg',
    // './BingWallpaper/20220401-HawaMahalJaipur_ROW4338982918_UHD.jpg',
    // './BingWallpaper/20220402-WhangareiFalls_ROW4816369857_UHD.jpg',
    // './BingWallpaper/20220403-TaihuCherry_ROW5365833241_UHD.jpg',
    // './BingWallpaper/20220404-NorwayBoulder_ROW0458315315_UHD.jpg',
    // './BingWallpaper/20220405-Godafoss_ROW0604877631_UHD.jpg',
    // './BingWallpaper/20220406-NorthernCaracara_ROW2343321532_UHD.jpg',
    // './BingWallpaper/20220407-Malaga_ROW6853769882_UHD.jpg',
    // './BingWallpaper/20220408-PontaDelgada_ROW2848198908_UHD.jpg',
    // './BingWallpaper/20220409-LightPainting_ROW2959335373_UHD.jpg',
    // './BingWallpaper/20220410-Caracal_ROW3033843939_UHD.jpg',
    // './BingWallpaper/20220411-FernFronds_ROW3127704542_UHD.jpg',
    // './BingWallpaper/20220412-WaningGibbous_ROW8355065227_UHD.jpg',
    // './BingWallpaper/20220413-Mitsumata_ROW8537058833_UHD.jpg',
    // './BingWallpaper/20220418-SquareTowerHouse_ROW9195175527_UHD.jpg',
    // './BingWallpaper/20220419-PlitviceBoardwalk_ROW9313992469_UHD.jpg',
    // './BingWallpaper/20220420-MuteSwan_ROW9658473929_UHD.jpg',
    // './BingWallpaper/20220421-IcelandicSummer_ROW9809356178_UHD.jpg',
    // './BingWallpaper/20220425-ThreeKings_ROW3213772000_UHD.jpg',
    // './BingWallpaper/20220426-Hunebourg_ROW9321634276_UHD.jpg',
    // './BingWallpaper/20220427-SvalbardSun_ROW3440721830_UHD.jpg',
    // './BingWallpaper/20220502-TravertineTurkey_ROW7448182986_UHD.jpg',
    // './BingWallpaper/20220503-DuckHen_ROW7540751263_UHD.jpg',
    // './BingWallpaper/20220504-Moulin_ROW7704529983_UHD.jpg',
    // './BingWallpaper/20220505-JaliscoAgave_ROW7883559373_UHD.jpg',
    // './BingWallpaper/20220509-GoremeNationalPark_ROW4400268848_UHD.jpg',
    // './BingWallpaper/20220510-GiffordPinchot_ROW4523187616_UHD.jpg',
    // './BingWallpaper/20220511-OiaVillage_ROW4677481781_UHD.jpg',
    // './BingWallpaper/20220512-RiverBrathay_ROW4783139030_UHD.jpg',
    // './BingWallpaper/20220513-MaasaiGiraffe_ROW4908270547_UHD.jpg',
    // './BingWallpaper/20220514-WindmillDay_ROW5032473084_UHD.jpg',
    // './BingWallpaper/20220516-PawneeOwls_ROW5331197269_UHD.jpg',
    // './BingWallpaper/20220517-SaltPondsMaras_ROW5447706768_UHD.jpg',
    // './BingWallpaper/20220518-SchlossGluecksburg_ROW5521923485_UHD.jpg',
    // './BingWallpaper/20220519-GlassBridge_ROW5665072755_UHD.jpg',
    // './BingWallpaper/20220520-ApisMellifera_ROW0542494356_UHD.jpg',
    // './BingWallpaper/20220523-KolliHills_ROW1593229581_UHD.jpg',
    // './BingWallpaper/20220524-KornatiNP_ROW1780518510_UHD.jpg',
    // './BingWallpaper/20220525-Alhambra_PT-BR3599168164_UHD.jpg',
    // './BingWallpaper/20220526-Monteverde_PT-BR3538621661_UHD.jpg',
    // './BingWallpaper/20220527-MarinHeadlands_PT-BR3429837612_UHD.jpg',
    // './BingWallpaper/20220530-MountFryatt_PT-BR1921420647_UHD.jpg',
    // './BingWallpaper/20220601-MarovoLagoon_PT-BR1778895131_UHD.jpg',
    // './BingWallpaper/20220602-QueenJubilee_PT-BR1679304354_UHD.jpg',
    // './BingWallpaper/20220603-MoabCycling_PT-BR7194242480_UHD.jpg',
    // './BingWallpaper/20220606-IndigoBunting_PT-BR7028461378_UHD.jpg',
    // './BingWallpaper/20220607-HaagaRhododendron_PT-BR6967896279_UHD.jpg',
    // './BingWallpaper/20220608-CommonDolphin_PT-BR6885615130_UHD.jpg',
    // './BingWallpaper/20220609-SantuarioDomBosco_PT-BR3893760747_UHD.jpg',
    // './BingWallpaper/20220610-CRPoppies_PT-BR6816443026_UHD.jpg',
    // './BingWallpaper/20220613-OkavangoElephant_PT-BR6556872333_UHD.jpg',
    // './BingWallpaper/20220615-ClingmansDome_PT-BR6440795563_UHD.jpg',
    // './BingWallpaper/20220620-SwallowtailFlower_PT-BR0559583944_UHD.jpg',
    // './BingWallpaper/20220623-MostarBridge_PT-BR2231865288_UHD.jpg',
    // './BingWallpaper/20220630-AcramanCrater_PT-BR4745006798_UHD.jpg',
    // './BingWallpaper/20220701-WeatherGirls_PT-BR9779302652_UHD.jpg',
    // './BingWallpaper/20220704-SharavatiBridge_PT-BR6886909645_UHD.jpg',
    // './BingWallpaper/20220705-FannetteIsland_PT-BR1515497320_UHD.jpg',
    // './BingWallpaper/20220706-JacaretingaCaiman_PT-BR5016990215_UHD.jpg',
    // './BingWallpaper/20220707-HecetaHead_PT-BR9602747400_UHD.jpg',
    // './BingWallpaper/20220712-SpiralHill_PT-BR3566517069_UHD.jpg',
    // './BingWallpaper/20220713-BasaltGiants_PT-BR3741238014_UHD.jpg',
    // './BingWallpaper/20220714-BabyLemons_PT-BR4233780559_UHD.jpg',
    // './BingWallpaper/20220715-Arrone_PT-BR9247633572_UHD.jpg',
    // './BingWallpaper/20220716-AmericanGoldfinch_PT-BR9559443950_UHD.jpg',
    // './BingWallpaper/20220717-CoyoteButtes_PT-BR9761191258_UHD.jpg',
    // './BingWallpaper/20220718-OmijimaIsland_PT-BR9957032794_UHD.jpg',
    // './BingWallpaper/20220719-SantaBarbara_PT-BR2570891422_UHD.jpg',
    // './BingWallpaper/20220720-MoonPhases_PT-BR0207302831_UHD.jpg',
    // './BingWallpaper/20220721-AbbeyGardens_PT-BR0391843530_UHD.jpg',
    // './BingWallpaper/20220722-SGIMontenegro_PT-BR0562252595_UHD.jpg',
    // './BingWallpaper/20220726-MangroveDay_PT-BR1465406648_UHD.jpg',
    // './BingWallpaper/20220727-NabateanTomb_PT-BR1654920860_UHD.jpg',
    // './BingWallpaper/20220728-LongsPeak_PT-BR1847725385_UHD.jpg',
    // './BingWallpaper/20220801-LavaTube_PT-BR3691169289_UHD.jpg',
    // './BingWallpaper/20220802-HickmanBridge_PT-BR3632714538_UHD.jpg',
    // './BingWallpaper/20220803-RedneckedGrebe_PT-BR3584200574_UHD.jpg',
    // './BingWallpaper/20220804-BangladeshWaterLilies_PT-BR3540995587_UHD.jpg',
    // './BingWallpaper/20220805-OswaldoCruzFD_PT-BR3486073038_UHD.jpg',
    // './BingWallpaper/20220806-SFSaltFlats_PT-BR3410772498_UHD.jpg',
    // './BingWallpaper/20220807-SpringPoint_PT-BR3354586136_UHD.jpg',
    // './BingWallpaper/20220808-EsPantaleu_PT-BR3305094035_UHD.jpg',
    // './BingWallpaper/20220809-CuevaManos_PT-BR3253439992_UHD.jpg',
    // './BingWallpaper/20220810-AnniversaryJTNP_PT-BR3180018906_UHD.jpg',
    // './BingWallpaper/20220811-MtTsubakuro_PT-BR4172492131_UHD.jpg',
    // './BingWallpaper/20220812-AmboseliElephants_PT-BR2836782410_UHD.jpg',
    // './BingWallpaper/20220813-BoundaryWaters_PT-BR3564323916_UHD.jpg',
    // './BingWallpaper/20220814-Cassowary_PT-BR4044547706_UHD.jpg',
    // './BingWallpaper/20220815-ChittorgarhFort_PT-BR4670001633_UHD.jpg',
    // './BingWallpaper/20220816-GreatWhiteRoller_PT-BR6383812627_UHD.jpg',
    // './BingWallpaper/20220817-AquarioNatural_PT-BR6724639460_UHD.jpg',
    // './BingWallpaper/20220818-SourHerring_PT-BR7357568290_UHD.jpg',
    // './BingWallpaper/20220819-PenzancePool_PT-BR7590565728_UHD.jpg',
    // './BingWallpaper/20220820-BearProof_PT-BR7924896122_UHD.jpg',
    // './BingWallpaper/20220821-CostadaMorte_PT-BR8389730302_UHD.jpg',
    // './BingWallpaper/20220822-TenderMoment_PT-BR8677667437_UHD.jpg',
    // './BingWallpaper/20220823-MentonFrance_PT-BR9199718615_UHD.jpg',
    // './BingWallpaper/20220824-WheatField_PT-BR0149408725_UHD.jpg',
    // './BingWallpaper/20220825-CascadesNP_PT-BR0733085624_UHD.jpg',
    // './BingWallpaper/20220826-PeljesacWind_PT-BR2111739510_UHD.jpg',
    // './BingWallpaper/20220829-EstoniaBaltic_PT-BR3944634338_UHD.jpg',
    // './BingWallpaper/20220830-Migliarino_PT-BR4646053697_UHD.jpg',
    // './BingWallpaper/20220831-BlueLinckia_PT-BR4801918964_UHD.jpg',
    // './BingWallpaper/20220901-WildlifeCrossing_PT-BR5016101319_UHD.jpg',
    // './BingWallpaper/20220902-SeitanLimania_PT-BR5274999217_UHD.jpg',
    // './BingWallpaper/20220905-TaigaRoad_PT-BR6505491068_UHD.jpg',
    // './BingWallpaper/20220906-SquirrelMushroom_PT-BR6631174273_UHD.jpg',
    // './BingWallpaper/20220908-CircumnavigationAnni_PT-BR7517132102_UHD.jpg',
    // './BingWallpaper/20220909-BHNMBelize_PT-BR9502865249_UHD.jpg',
    // './BingWallpaper/20220910-KLMidAutumn_PT-BR9849851608_UHD.jpg',
    // './BingWallpaper/20220911-DiaCerrado_PT-BR0527103836_UHD.jpg',
    // './BingWallpaper/20220912-Aracari_PT-BR1098746112_UHD.jpg',
    // './BingWallpaper/20220913-GSDNPest_PT-BR1366481357_UHD.jpg',
    // './BingWallpaper/20220914-MarbleCanyon_PT-BR2202324079_UHD.jpg',
    // './BingWallpaper/20220915-PyreneesPark_PT-BR2691935632_UHD.jpg',
    // './BingWallpaper/20220916-PianePuma_PT-BR3294527868_UHD.jpg',
    // './BingWallpaper/20220920-SitkaOtters_PT-BR8466489649_UHD.jpg',
    // './BingWallpaper/20220921-PWPeaceDoves_PT-BR8883337313_UHD.jpg',
    // './BingWallpaper/20220922-LastDollarRoad_PT-BR9368324666_UHD.jpg',
    // './BingWallpaper/20220923-GoldenJellyfish_PT-BR2572922719_UHD.jpg',
    // './BingWallpaper/20220927-YellowstoneUGB_PT-BR3591557417_UHD.jpg',
    // './BingWallpaper/20220928-FosterCoveredBridge_PT-BR4438434220_UHD.jpg',
    // './BingWallpaper/20220929-InfiniD_PT-BR4722226522_UHD.jpg',
    // './BingWallpaper/20220930-EubalaenaAustralis_PT-BR4922038645_UHD.jpg',
    // './BingWallpaper/20221004-CosmicCliffs_PT-BR5730953027_UHD.jpg',
    // './BingWallpaper/20221005-FlamingoTeacher_PT-BR5899435795_UHD.jpg',
    // './BingWallpaper/20221006-BayofBiscay_PT-BR6052555319_UHD.jpg',
    // './BingWallpaper/20221007-OberbaumBridge_PT-BR2077486084_UHD.jpg',
    // './BingWallpaper/20221010-ValvestinoDam_PT-BR3634685593_UHD.jpg',
    // './BingWallpaper/20221013-AlaskaMoose_PT-BR4786128463_UHD.jpg',
    // './BingWallpaper/20221016-PrinceChristianSound_PT-BR6060243959_UHD.jpg',
    // './BingWallpaper/20221017-SwedenOwl_PT-BR6555122510_UHD.jpg',
    // './BingWallpaper/20221018-GB25Anni_PT-BR7858319347_UHD.jpg',
    // './BingWallpaper/20221019-WartburgCastle_PT-BR8106279489_UHD.jpg',
    // './BingWallpaper/20221020-SlothDay_PT-BR8613593551_UHD.jpg',
    // './BingWallpaper/20221022-KarstMountains_PT-BR4287850223_UHD.jpg',
    // './BingWallpaper/20221023-Knobbelzwaan_PT-BR4548072588_UHD.jpg',
    // './BingWallpaper/20221024-GuwahatiDiwali_PT-BR6814857917_UHD.jpg',
    // './BingWallpaper/20221025-OrcusMouth_PT-BR5122222130_UHD.jpg',
    // './BingWallpaper/20221026-BrockenSpecter_PT-BR5509487626_UHD.jpg',
    // './BingWallpaper/20221027-BridgeofSighs_PT-BR5684060427_UHD.jpg',
    // './BingWallpaper/20221031-CarlosDrummond120_PT-BR1070507633_UHD.jpg',
    // './BingWallpaper/20221104-Deities_PT-BR2795525471_UHD.jpg',
    // './BingWallpaper/20221107-CrestedButteEclispe_PT-BR4446097044_UHD.jpg',
    // './BingWallpaper/20221116-Unesco50_PT-BR6043327844_UHD.jpg',
    // './BingWallpaper/20221117-McKenzieRiverTrail_PT-BR6251948053_UHD.jpg',
    // './BingWallpaper/20221118-IslamicArt_PT-BR1855196332_UHD.jpg',
    // './BingWallpaper/20221121-FIFA2022_PT-BR8218468406_UHD.jpg',
    // './BingWallpaper/20221123-HelianthusAnnuus_PT-BR8881284940_UHD.jpg',
    // './BingWallpaper/20221124-AschauChiemgau_PT-BR9234103307_UHD.jpg',
    // './BingWallpaper/20221128-RedPlanetDay_PT-BR0687494844_UHD.jpg',
    // './BingWallpaper/20221129-HeronGiving_PT-BR0915216293_UHD.jpg',
    // './BingWallpaper/20221130-RovinjCroatia_PT-BR1521547595_UHD.jpg',
    // './BingWallpaper/20221201-AntarcticaDay_PT-BR1765332512_UHD.jpg',
    // './BingWallpaper/20221202-BraidedRiverDelta_PT-BR2103312525_UHD.jpg',
    // './BingWallpaper/20221205-StNick_PT-BR2551933620_UHD.jpg',
    // './BingWallpaper/20221206-GreatEgret_PT-BR2689352423_UHD.jpg',
    // './BingWallpaper/20221207-TangleCreekFalls_PT-BR2837779009_UHD.jpg',
    // './BingWallpaper/20221208-FlorenceAerial_PT-BR7634877783_UHD.jpg',
    // './BingWallpaper/20221209-NorwayMuskox_PT-BR7683183915_UHD.jpg',
    // './BingWallpaper/20221212-PoinsettiaDay_PT-BR7846358307_UHD.jpg',
    // './BingWallpaper/20221213-InstagramHallstatt_PT-BR7899105457_UHD.jpg',
    // './BingWallpaper/20221214-GranParadiso100th_PT-BR8040640735_UHD.jpg',
    // './BingWallpaper/20221215-OscarNiemeyer_PT-BR5346400510_UHD.jpg',
    // './BingWallpaper/20221220-PalaceBelvedere_PT-BR2452318549_UHD.jpg',
    // './BingWallpaper/20221221-SolarHalo_PT-BR2323112122_UHD.jpg',
    // './BingWallpaper/20221222-TreeGaleriesLafayette_PT-BR2224523829_UHD.jpg',
    // './BingWallpaper/20221223-GentooGrievances_PT-BR2134800834_UHD.jpg',
    // './BingWallpaper/20221226-BeverleyWestwood_PT-BR1880349839_UHD.jpg',
    // './BingWallpaper/20221228-ChiesaBianca_PT-BR1755788617_UHD.jpg',
    // './BingWallpaper/20221229-ButterflyEffect_PT-BR1686758245_UHD.jpg',
    // './BingWallpaper/20221230-SaoSilvestre_PT-BR8562839549_UHD.jpg',
    // './BingWallpaper/20230109-BisonWindCave_PT-BR8900405684_UHD.jpg',
    // './BingWallpaper/20230110-LandartPainting_PT-BR9036618473_UHD.jpg',
    // './BingWallpaper/20230111-Umschreibung_PT-BR8777372761_UHD.jpg',
    // './BingWallpaper/20230112-RumeliHisari_PT-BR8703168873_UHD.jpg',
    // './BingWallpaper/20230113-Pneumatocysts_PT-BR5612865719_UHD.jpg',
    // './BingWallpaper/20230116-FrozenBubblesAlberta_PT-BR6062602082_UHD.jpg',
    // './BingWallpaper/20230117-SessileOaks_PT-BR4247012653_UHD.jpg',
    // './BingWallpaper/20230120-FalklandKings_PT-BR3073987483_UHD.jpg',
    // './BingWallpaper/20230125-EstaiadaSaoPaulo_PT-BR4426760487_UHD.jpg',
    // './BingWallpaper/20230126-HighArchChina_PT-BR0414492326_UHD.jpg',
    // './BingWallpaper/20230127-RedMangrove_PT-BR6364946074_UHD.jpg',
    // './BingWallpaper/20230128-BlueBahamas_PT-BR5700644190_UHD.jpg',
    // './BingWallpaper/20230129-BlackbirdDay_PT-BR2551195387_UHD.jpg',
    // './BingWallpaper/20230130-IceSailingBalaton_PT-BR4468661627_UHD.jpg',
    // './BingWallpaper/20230131-ZebraTrio_PT-BR4226850473_UHD.jpg',
    // './BingWallpaper/20230201-SunriseCastle_PT-BR7193837721_UHD.jpg',
    // './BingWallpaper/20230202-GroundhogThree_PT-BR2483973405_UHD.jpg',
    // './BingWallpaper/20230203-QuebecFrontenac_PT-BR2238273073_UHD.jpg',
    // './BingWallpaper/20230207-MedievalLabro_PT-BR4954609895_UHD.jpg',
    // './BingWallpaper/20230208-NorwayRestArea_PT-BR4570146967_UHD.jpg',
    // './BingWallpaper/20230209-LowerAntelopeAZ_PT-BR3183731891_UHD.jpg',
    // './BingWallpaper/20230213-MoonValley_PT-BR2247062582_UHD.jpg',
    // './BingWallpaper/20230214-OtaruIgloo_PT-BR2303626015_UHD.jpg',
    // './BingWallpaper/20230215-HippoDayChobe_PT-BR2363188958_UHD.jpg',
    // './BingWallpaper/20230216-FireFallYosemite_PT-BR2432287290_UHD.jpg',
    // './BingWallpaper/20230224-RichmondParkDuck_PT-BR8787296136_UHD.jpg',
    // './BingWallpaper/20230227-PolarBearFrost_PT-BR0431198913_UHD.jpg',
    // './BingWallpaper/20230228-AtraniAmalfi_PT-BR0850219257_UHD.jpg',
    // './BingWallpaper/20230301-LuebeckCityGate_PT-BR1795689209_UHD.jpg',
    // './BingWallpaper/20230302-NegratinSpain_PT-BR1249920654_UHD.jpg',
    // './BingWallpaper/20230303-OrcaNorway_PT-BR1682815787_UHD.jpg',
    // './BingWallpaper/20230307-YuanyangChina_PT-BR5370170662_UHD.jpg',
    // './BingWallpaper/20230308-IntlWomensDayChange_PT-BR6861747407_UHD.jpg',
    // './BingWallpaper/20230309-WaimeaRainbow_PT-BR7420106529_UHD.jpg',
    // './BingWallpaper/20230310-EdaleValley_PT-BR0117674743_UHD.jpg',
    // './BingWallpaper/20230314-CyprusMaze_PT-BR0372990733_UHD.jpg',
    // './BingWallpaper/20230315-AgueroSpain_PT-BR0434486976_UHD.jpg',
    // './BingWallpaper/20230316-ChengduPanda_PT-BR0503978059_UHD.jpg',
    // './BingWallpaper/20230321-ColourDay_PT-BR0798691533_UHD.jpg',
    // './BingWallpaper/20230322-LakePowellAerial_PT-BR0861507894_UHD.jpg',
    // './BingWallpaper/20230323-CloudsPatagonia_PT-BR0938226680_UHD.jpg',
    // './BingWallpaper/20230324-WildGarlic_PT-BR5016691501_UHD.jpg',
    // './BingWallpaper/20230327-NYCClouds_PT-BR6801277144_UHD.jpg',
    // './BingWallpaper/20230328-MWDolomites_PT-BR7042965893_UHD.jpg',
    // './BingWallpaper/20230329-NuzzleManatee_PT-BR7322931315_UHD.jpg',
    // './BingWallpaper/20230330-PeacockFeathers_PT-BR7599537252_UHD.jpg',
    // './BingWallpaper/20230331-SteyrRiver_PT-BR1509905208_UHD.jpg',
    // './BingWallpaper/20230403-HonaunauNP_PT-BR9038463987_UHD.jpg',
    // './BingWallpaper/20230404-RomanBridge_PT-BR9293657431_UHD.jpg',
    // './BingWallpaper/20230405-BlackGrouseLekking_PT-BR9678718945_UHD.jpg',
    // './BingWallpaper/20230406-ArizonaPinkMoon_PT-BR9957307655_UHD.jpg',
    // './BingWallpaper/20230407-KitsAspen_PT-BR8299899730_UHD.jpg',
    // './BingWallpaper/20230408-NIrelandGiants_PT-BR4823231390_UHD.jpg',
    // './BingWallpaper/20230409-LithuanianEggs_PT-BR5718719505_UHD.jpg',
    // './BingWallpaper/20230410-ElephantTwins_PT-BR7059740829_UHD.jpg',
    // './BingWallpaper/20230411-MossyGrottoFalls_PT-BR8681744375_UHD.jpg',
    // './BingWallpaper/20230412-EuropeFromISS_PT-BR8580836048_UHD.jpg',
    // './BingWallpaper/20230413-PhloxSubulata_PT-BR2187930252_UHD.jpg',
    // './BingWallpaper/20230414-RedSeaStars_PT-BR9156297625_UHD.jpg',
    // './BingWallpaper/20230415-LorenzoQuinn_PT-BR1753082693_UHD.jpg',
    // './BingWallpaper/20230416-KiteDay_PT-BR2236604621_UHD.jpg',
    // './BingWallpaper/20230417-OneThousandSprings_PT-BR6434426927_UHD.jpg',
    // './BingWallpaper/20230418-MPPUnesco_PT-BR8876177432_UHD.jpg',
    // './BingWallpaper/20230419-TaiwanYuhina_PT-BR9492619236_UHD.jpg',
    // './BingWallpaper/20230420-PantherChameleon_PT-BR7376716625_UHD.jpg',
    // './BingWallpaper/20230421-ProcidaItaly_PT-BR4815511808_UHD.jpg',
    // './BingWallpaper/20230422-EarthDayFox_PT-BR4769845045_UHD.jpg',
    // './BingWallpaper/20230423-StuttgartPublicLibrary_PT-BR4937823800_UHD.jpg',
    // './BingWallpaper/20230424-FranconianWineCellar_PT-BR4973800707_UHD.jpg',
    // './BingWallpaper/20230425-AdelieWPD_PT-BR5302212413_UHD.jpg',
    // './BingWallpaper/20230426-GHOAudubonDay_PT-BR5342739946_UHD.jpg',
    // './BingWallpaper/20230427-SouthPadre_PT-BR5387043078_UHD.jpg',
    // './BingWallpaper/20230428-MariposaGrove_PT-BR5231629704_UHD.jpg',
    // './BingWallpaper/20230502-KlostersSerneus_PT-BR5752952274_UHD.jpg',
    // './BingWallpaper/20230503-ThreeWildebeest_PT-BR5590684985_UHD.jpg',
    // './BingWallpaper/20230504-RebelBase_PT-BR6000097788_UHD.jpg',
    // './BingWallpaper/20230505-Popocatepetl_PT-BR1206870374_UHD.jpg',
    // './BingWallpaper/20230506-HwangmaesanAzaleas_PT-BR1848101696_UHD.jpg',
    // './BingWallpaper/20230507-SealLaughing_PT-BR3611435433_UHD.jpg',
    // './BingWallpaper/20230508-TheChaps_PT-BR3805944610_UHD.jpg',
    // './BingWallpaper/20230509-Atoll_PT-BR4064286054_UHD.jpg',
    // './BingWallpaper/20230510-CordouanLighthouse_PT-BR4280996810_UHD.jpg',
    // './BingWallpaper/20230511-FootballField_PT-BR4517916371_UHD.jpg',
    // './BingWallpaper/20230516-AmericanWetlands_PT-BR5846493559_UHD.jpg',
    // './BingWallpaper/20230517-CormorantBridge_PT-BR6164830212_UHD.jpg',
    // './BingWallpaper/20230518-MuseoSoumaya_PT-BR6724252759_UHD.jpg',
    // './BingWallpaper/20230523-WesternBoxTurtle_PT-BR5703667401_UHD.jpg',
    // './BingWallpaper/20230525-SaksunFaroe_PT-BR6443520957_UHD.jpg',
    // './BingWallpaper/20230531-WorldOtterDay_PT-BR8489449093_UHD.jpg',
    // './BingWallpaper/20230601-ReefAwareness_PT-BR8773467623_UHD.jpg',
    // './BingWallpaper/20230604-MauiBeach_PT-BR5937841050_UHD.jpg',
    // './BingWallpaper/20230605-PlasticParrotfish_PT-BR6303382304_UHD.jpg',
    // './BingWallpaper/20230606-CliffsEtretat_PT-BR6788899813_UHD.jpg',
    // './BingWallpaper/20230607-ChacoCulture_PT-BR7075653846_UHD.jpg',
    // './BingWallpaper/20230613-OkefenokeeSwamp_PT-BR9993214300_UHD.jpg',
    // './BingWallpaper/20230614-PassauSunsetJune_PT-BR1202861779_UHD.jpg',
    // './BingWallpaper/20230615-SmokyFireflies_PT-BR0661449530_UHD.jpg',
    // './BingWallpaper/20230616-HawksbillTurtle_PT-BR9425456104_UHD.jpg',
    // './BingWallpaper/20230617-SurfSanDiego_PT-BR0003573569_UHD.jpg',
    // './BingWallpaper/20230618-TernFather_PT-BR0620586180_UHD.jpg',
    // './BingWallpaper/20230619-Fawn_PT-BR1155184891_UHD.jpg',
    // './BingWallpaper/20230620-EagleTree_PT-BR1918929782_UHD.jpg',
    // './BingWallpaper/20230621-StonehengeSalisbury_PT-BR7064860081_UHD.jpg',
    // './BingWallpaper/20230624-NhaTrang_PT-BR8126662489_UHD.jpg',
    // './BingWallpaper/20230625-PetraTreasury_PT-BR8415620611_UHD.jpg',
    // './BingWallpaper/20230626-VillandryGarden_PT-BR8698616986_UHD.jpg',
    // './BingWallpaper/20230627-SedonaSunset_PT-BR8929237234_UHD.jpg',
    // './BingWallpaper/20230628-PrideIceland_PT-BR9247748028_UHD.jpg',
    // './BingWallpaper/20230629-BanyakIslands_PT-BR9478942704_UHD.jpg',
    // './BingWallpaper/20230630-ClamBears_PT-BR5661111850_UHD.jpg',
    // './BingWallpaper/20230703-CoyoteBanff_PT-BR7233283124_UHD.jpg',
    // './BingWallpaper/20230704-GrasslandsNationalParkSaskachewan_PT-BR8783608554_UHD.jpg',
    // './BingWallpaper/20230705-CorfuBeach_PT-BR9062903399_UHD.jpg',
    // './BingWallpaper/20230706-KissingPenguins_PT-BR9632546224_UHD.jpg',
    // './BingWallpaper/20230708-CooperChapel_PT-BR0663109436_UHD.jpg',
    // './BingWallpaper/20230709-MoselleRiver_PT-BR0973965999_UHD.jpg',
    // './BingWallpaper/20230710-SomersetLavender_PT-BR1413116604_UHD.jpg',
    // './BingWallpaper/20230711-WorldPopDay_PT-BR1851252884_UHD.jpg',
    // './BingWallpaper/20230712-NakupendaBeach_PT-BR2414643344_UHD.jpg',
    // './BingWallpaper/20230718-BucerosBicornis_PT-BR4126755280_UHD.jpg',
    // './BingWallpaper/20230719-CrescentLake_PT-BR4521081721_UHD.jpg',
    // './BingWallpaper/20230723-TeaEstate_PT-BR7362336385_UHD.jpg',
    // './BingWallpaper/20230724-ZebraCousins_PT-BR7618632224_UHD.jpg',
    // './BingWallpaper/20230725-LasLagunas_PT-BR7962535557_UHD.jpg',
    // './BingWallpaper/20230726-MangrovePark_PT-BR8252208329_UHD.jpg',
    // './BingWallpaper/20230727-ParisLouvre_PT-BR8482721698_UHD.jpg',
    // './BingWallpaper/20230728-SanBlasIslands_PT-BR0401979810_UHD.jpg',
    // './BingWallpaper/20230731-RockHouse_PT-BR1317959192_UHD.jpg',
    // './BingWallpaper/20230801-DenaliClimber_PT-BR1512476985_UHD.jpg',
    // './BingWallpaper/20230802-CapitolButte_PT-BR1710363839_UHD.jpg',
    // './BingWallpaper/20230803-ZelenciSprings_PT-BR2064336858_UHD.jpg',
    // './BingWallpaper/20230816-KeyWestBridge_PT-BR4840240790_UHD.jpg',
    // './BingWallpaper/20230818-AvatarMountain_PT-BR6129685721_UHD.jpg',
    // './BingWallpaper/20230819-CameraSquirrel_PT-BR6385198760_UHD.jpg',
    // './BingWallpaper/20230820-StartPointLight_PT-BR6638873206_UHD.jpg',
    // './BingWallpaper/20230821-EmeraldLakeYukon_PT-BR6870373450_UHD.jpg',
    // './BingWallpaper/20230822-TunisiaAmphitheatre_PT-BR7158376086_UHD.jpg',
    // './BingWallpaper/20230823-SkogafossWaterfall_PT-BR7394704213_UHD.jpg',
    // './BingWallpaper/20230824-SharkFinCove_PT-BR7883835575_UHD.jpg',
    // './BingWallpaper/20230825-YellowstoneFalls_PT-BR9098060623_UHD.jpg',
    // './BingWallpaper/20230826-MuseumIsland_PT-BR8963448703_UHD.jpg',
    // './BingWallpaper/20230827-JejuIsland_PT-BR9709424448_UHD.jpg',
    // './BingWallpaper/20230828-DubrovnikHarbor_PT-BR0322375013_UHD.jpg',
    // './BingWallpaper/20230829-TetonBison_PT-BR0402928868_UHD.jpg',
    // './BingWallpaper/20230830-NingalooShark_PT-BR6162667843_UHD.jpg',
    // './BingWallpaper/20230831-IronwoodCactus_PT-BR6649967427_UHD.jpg',
    // './BingWallpaper/20230901-TurkeyTailMush_PT-BR7169836000_UHD.jpg',
    // './BingWallpaper/20230904-BourgesMarsh_PT-BR0624704700_UHD.jpg',
    // './BingWallpaper/20230905-MountSegla_PT-BR1076909696_UHD.jpg',
    // './BingWallpaper/20230906-CreteHarbor_PT-BR1581901908_UHD.jpg',
    // './BingWallpaper/20230907-MonumentoIpiranga_PT-BR3590337434_UHD.jpg',
    // './BingWallpaper/20230908-BathCircus_PT-BR8962736983_UHD.jpg',
    // './BingWallpaper/20230909-AyutthayaTemple_PT-BR9714434694_UHD.jpg',
    // './BingWallpaper/20230910-WalrusSvalbard_PT-BR0496764214_UHD.jpg',
    // './BingWallpaper/20230911-MarathonMedoc_PT-BR1559256786_UHD.jpg',
    // './BingWallpaper/20230912-NorthSeaStairs_PT-BR3028511993_UHD.jpg',
    // './BingWallpaper/20230913-HemakutaHill_PT-BR7948471719_UHD.jpg',
    // './BingWallpaper/20230914-MongoliaHorses_PT-BR8973116827_UHD.jpg',
    // './BingWallpaper/20230918-MilkyWayPortugal_PT-BR3876107182_UHD.jpg',
    // './BingWallpaper/20230919-OktoberfestWorkers_PT-BR4293032455_UHD.jpg',
    // './BingWallpaper/20230920-ArkadiaPark_PT-BR4736119356_UHD.jpg',
    // './BingWallpaper/20230921-BrazilCopaiba_PT-BR7420293329_UHD.jpg',
    // './BingWallpaper/20230922-ShamwariRhino_PT-BR2578968454_UHD.jpg',
    // './BingWallpaper/20230925-GlacierBayOtter_PT-BR5509451113_UHD.jpg',
    // './BingWallpaper/20230926-LightStationSP_PT-BR9699969670_UHD.jpg',
    // './BingWallpaper/20230927-CapriKrupp_PT-BR6134486389_UHD.jpg',
    // './BingWallpaper/20230928-MaritimeDay_PT-BR6479092304_UHD.jpg',
    // './BingWallpaper/20231001-LakeBledSunrise_PT-BR7689736785_UHD.jpg',
    // './BingWallpaper/20231002-VuittonFoundation_PT-BR8001158053_UHD.jpg',
    // './BingWallpaper/20231003-WhitsundaySwirl_PT-BR8520728356_UHD.jpg',
    // './BingWallpaper/20231004-TarantulaNebula_PT-BR8856801522_UHD.jpg',
    // './BingWallpaper/20231005-BrazilCanyon_PT-BR9855419270_UHD.jpg',
    // './BingWallpaper/20231006-TaughannockFalls_PT-BR3287209591_UHD.jpg',
    // './BingWallpaper/20231007-GrizzlyFalls_PT-BR4321491601_UHD.jpg',
    // './BingWallpaper/20231008-OctoClam_PT-BR4797595929_UHD.jpg',
    // './BingWallpaper/20231009-VeniceSkatePark_PT-BR5979346434_UHD.jpg',
    // './BingWallpaper/20231010-SoprisSunrise_PT-BR5575727511_UHD.jpg',
    // './BingWallpaper/20231011-JohnDayFossil_PT-BR5921609845_UHD.jpg',
    // './BingWallpaper/20231012-BasilicaOfOurLadyAparecida_PT-BR7685662774_UHD.jpg',
    // './BingWallpaper/20231013-ViesteItaly_PT-BR8163447010_UHD.jpg',
    // './BingWallpaper/20231014-RingEclipse_PT-BR8456160531_UHD.jpg',
    // './BingWallpaper/20231015-GentooJump_PT-BR8915637831_UHD.jpg',
    // './BingWallpaper/20231016-GoldenEnchantments_PT-BR9264199227_UHD.jpg',
    // './BingWallpaper/20231017-SpreadsheetDay_PT-BR9592083613_UHD.jpg',
    // './BingWallpaper/20231018-KodiakAlaska_PT-BR9855101179_UHD.jpg',
    // './BingWallpaper/20231019-WaterLilyVietnam_PT-BR0091482904_UHD.jpg',
    // './BingWallpaper/20231020-PygmySloth_PT-BR7040912343_UHD.jpg',
    // './BingWallpaper/20231021-PersepolisRelief_PT-BR7243215080_UHD.jpg',
    // './BingWallpaper/20231022-AstoriaBridge_PT-BR7535453124_UHD.jpg',
    // './BingWallpaper/20231023-CapybaraAnimals_PT-BR8447005042_UHD.jpg',
    // './BingWallpaper/20231024-FuzerCastle_PT-BR8679646534_UHD.jpg',
    // './BingWallpaper/20231025-GrandStaircase_PT-BR9054021787_UHD.jpg',
    // './BingWallpaper/20231026-ViennaAutumn_PT-BR1572205142_UHD.jpg',
    // './BingWallpaper/20231030-AutumnRaven_PT-BR0746434304_UHD.jpg',
    // './BingWallpaper/20231031-HalloweenPorchAI_PT-BR0951998014_UHD.jpg',
    // './BingWallpaper/20231101-HautBarr_PT-BR1136803227_UHD.jpg',
    // './BingWallpaper/20231102-DeathValleySalt_PT-BR1340047933_UHD.jpg',
    // './BingWallpaper/20231103-SeaNettles_PT-BR5271291452_UHD.jpg',
    // './BingWallpaper/20231104-BisonSnow_PT-BR5474205196_UHD.jpg',
    // './BingWallpaper/20231105-GrandPrix_PT-BR6808557599_UHD.jpg',
    // './BingWallpaper/20231106-LagoPehoe_PT-BR7207150939_UHD.jpg',
    // './BingWallpaper/20231107-KirkilaiTower_PT-BR7621232090_UHD.jpg',
    // './BingWallpaper/20231108-ManateeMama_PT-BR7962381210_UHD.jpg',
    // './BingWallpaper/20231109-NorwayBirch_PT-BR8138936699_UHD.jpg',
    // './BingWallpaper/20231110-RiodeJaneiro_PT-BR8681945760_UHD.jpg',
    // './BingWallpaper/20231111-ValDiFunes_PT-BR6615371523_UHD.jpg',
    // './BingWallpaper/20231112-DiwaliAyodhya_PT-BR8972451551_UHD.jpg',
    // './BingWallpaper/20231113-OliveOrchard_PT-BR9235175980_UHD.jpg',
    // './BingWallpaper/20231114-RussellLupines_PT-BR9426027629_UHD.jpg',
    // './BingWallpaper/20231115-SarekSweden_PT-BR9598980738_UHD.jpg',
    // './BingWallpaper/20231116-AthensAcropolis_PT-BR9783837981_UHD.jpg',
    // './BingWallpaper/20231117-BadRiver_PT-BR2573221301_UHD.jpg',
    // './BingWallpaper/20231118-MilsePolarBear_PT-BR2847800646_UHD.jpg',
    // './BingWallpaper/20231119-DiadaBandeira_PT-BR3508927163_UHD.jpg',
    // './BingWallpaper/20231120-ChapmanAdventure_PT-BR3697464230_UHD.jpg',
    // './BingWallpaper/20231121-HelloSeal_PT-BR4000213831_UHD.jpg',
    // './BingWallpaper/20231122-PepalantusPlants_PT-BR5920810931_UHD.jpg',
    // './BingWallpaper/20231123-TeideNational_PT-BR6138267568_UHD.jpg',
    // './BingWallpaper/20231124-HallofMosses_PT-BR6641708132_UHD.jpg',
    // './BingWallpaper/20231125-TajoRiver_PT-BR6877712566_UHD.jpg',
    // './BingWallpaper/20231126-BradgateFallow_PT-BR7068932204_UHD.jpg',
    // './BingWallpaper/20231127-RioNegro_PT-BR7317950663_UHD.jpg',
    // './BingWallpaper/20231128-HumanKindness_PT-BR7560592724_UHD.jpg',
    // './BingWallpaper/20231129-TreeLighting_PT-BR7736994809_UHD.jpg',
    // './BingWallpaper/20231130-TrotternishStorr_PT-BR8013628330_UHD.jpg',
    // './BingWallpaper/20231201-IcebergAntarctica_PT-BR8687364076_UHD.jpg',
    // './BingWallpaper/20231202-AngkorPark_PT-BR8878071421_UHD.jpg',
    // './BingWallpaper/20231203-VermilionCliffs_PT-BR9118201402_UHD.jpg',
    // './BingWallpaper/20231204-CheetahDay_PT-BR9341375783_UHD.jpg',
    // './BingWallpaper/20231205-MuseumofTomorrow_PT-BR0071578162_UHD.jpg',
    // './BingWallpaper/20231206-CERNCenter_PT-BR9750877700_UHD.jpg',
    // './BingWallpaper/20231207-GrandCanyonVerdon_PT-BR9952684873_UHD.jpg',
    // './BingWallpaper/20231208-JerseyIsland_PT-BR0126731270_UHD.jpg',
    // './BingWallpaper/20231209-PatagoniaGuanaco_PT-BR0400423849_UHD.jpg',
    // './BingWallpaper/20231210-SaharaDunes_PT-BR0559111753_UHD.jpg',
    // './BingWallpaper/20231211-MountainDayChina_PT-BR0775570847_UHD.jpg',
    // './BingWallpaper/20231212-Poinsettia_PT-BR0931559837_UHD.jpg',
    // './BingWallpaper/20231213-ChapadaDiamantina_PT-BR0912635874_UHD.jpg',
    // './BingWallpaper/20231214-BorealOwl_PT-BR1424303006_UHD.jpg',
    // './BingWallpaper/20231215-SantaPark_PT-BR7158729653_UHD.jpg',
    // './BingWallpaper/20231216-GrandPlaceXmas_PT-BR7345216772_UHD.jpg',
    // './BingWallpaper/20231217-WinterWaxwings_PT-BR7478795667_UHD.jpg',
    // './BingWallpaper/20231218-CapitolReefSnow_PT-BR7723404626_UHD.jpg',
    // './BingWallpaper/20231219-WarsawChristmas_PT-BR7812599043_UHD.jpg',
    // './BingWallpaper/20231220-ValGardenaItaly_PT-BR7927921008_UHD.jpg',
    // './BingWallpaper/20231221-LjubljanaLights_PT-BR8015309848_UHD.jpg',
    // './BingWallpaper/20231222-SolsticiodeVerao_PT-BR8599569944_UHD.jpg',
    // './BingWallpaper/20231223-FestivusPenguins_PT-BR8893075864_UHD.jpg',
    // './BingWallpaper/20231224-EstoniaXmasEve_PT-BR8966974749_UHD.jpg',
    // './BingWallpaper/20231225-CaribouChristmas_PT-BR2682904328_UHD.jpg',
    // './BingWallpaper/20231226-ToucanetEmpoleirado_PT-BR9974845394_UHD.jpg',
    // './BingWallpaper/20231227-KirkjufellAurora_PT-BR0251942070_UHD.jpg',
    // './BingWallpaper/20231228-GreenlandHumpback_PT-BR0827643053_UHD.jpg',
    // './BingWallpaper/20231229-BlueAmsterdam_PT-BR8827173847_UHD.jpg',
    // './BingWallpaper/20231230-TadamiWinter_PT-BR9134257179_UHD.jpg',
    // './BingWallpaper/20231231-ReveillonBrazil_PT-BR9820187694_UHD.jpg',
    // './BingWallpaper/20240101-SleepingFox_PT-BR0026523663_UHD.jpg',
    // './BingWallpaper/20240102-BhutanSolstice_PT-BR0103911356_UHD.jpg',
    // './BingWallpaper/20240122-SantaCruzSunrise_PT-BR7110866378_UHD.jpg',
    // './BingWallpaper/20240123-MaldivesAtolls_PT-BR2284826864_UHD.jpg',
    // './BingWallpaper/20240124-IcelandBeach_PT-BR2508967674_UHD.jpg',
    // './BingWallpaper/20240125-FundacaodaCapital_PT-BR3549565256_UHD.jpg',
    // './BingWallpaper/20240126-HawkOwl_PT-BR7690108757_UHD.jpg',
    // './BingWallpaper/20240127-WinterCarnival_PT-BR0235088801_UHD.jpg',
    // './BingWallpaper/20240128-ChannelOutback_PT-BR0542625781_UHD.jpg',
    // './BingWallpaper/20240129-GollingerFalls_PT-BR0731696047_UHD.jpg',
    // './BingWallpaper/20240130-AlbaceteSpain_PT-BR1055348221_UHD.jpg',
    // './BingWallpaper/20240131-MacawParrot_PT-BR2174373090_UHD.jpg',
    // './BingWallpaper/20240201-HalbinselJasmund_PT-BR2384900992_UHD.jpg',
    // './BingWallpaper/20240202-AlpineMarmot_PT-BR7817972128_UHD.jpg',
    // './BingWallpaper/20240203-VeniceCarnival_PT-BR2721773267_UHD.jpg',
    // './BingWallpaper/20240204-DevetashkaCave_PT-BR2895645670_UHD.jpg',
    // './BingWallpaper/20240205-WesternMonarchs_PT-BR3062491558_UHD.jpg',
    // './BingWallpaper/20240206-LakeTahoeRock_PT-BR3293078683_UHD.jpg',
    // './BingWallpaper/20240207-PovosIndigenas_PT-BR6197320294_UHD.jpg',
    // './BingWallpaper/20240208-MtHoodOregon_PT-BR4355402757_UHD.jpg',
    // './BingWallpaper/20240209-PraiadeCopacabana_PT-BR1256625219_UHD.jpg',
    // './BingWallpaper/20240210-ChinaDragon_PT-BR1649344638_UHD.jpg',
    // './BingWallpaper/20240211-FolegandrosGreece_PT-BR2119893846_UHD.jpg',
    // './BingWallpaper/20240212-GiantTortoise_PT-BR2643244597_UHD.jpg',
    // './BingWallpaper/20240213-PegadungRocks_PT-BR4077101673_UHD.jpg',
    // './BingWallpaper/20240214-BowingCrane_PT-BR4236124881_UHD.jpg',
    // './BingWallpaper/20240215-HippopotamusDay_PT-BR4524933452_UHD.jpg',
    // './BingWallpaper/20240216-BackyardBird_PT-BR4739609894_UHD.jpg',
    // './BingWallpaper/20240217-LakeDolomites_PT-BR5853675668_UHD.jpg',
    // './BingWallpaper/20240218-DominicaWhales_PT-BR4985904903_UHD.jpg',
    // './BingWallpaper/20240219-CarnavalTenerife_PT-BR5233903925_UHD.jpg',
    // './BingWallpaper/20240220-PeakDistrictNP_PT-BR5424756118_UHD.jpg',
    // './BingWallpaper/20240221-YosemiteFirefall_PT-BR5614973878_UHD.jpg',
    // './BingWallpaper/20240222-IguazuFalls_PT-BR6454188192_UHD.jpg',
    // './BingWallpaper/20240223-HaghartsinMonastery_PT-BR9216139787_UHD.jpg',
    // './BingWallpaper/20240224-AlmondBloom_PT-BR9517500813_UHD.jpg',
    // './BingWallpaper/20240225-MtPrevostDuncan_PT-BR0029292582_UHD.jpg',
    // './BingWallpaper/20240226-GrandCanyonWinter_PT-BR0593676326_UHD.jpg',
    // './BingWallpaper/20240227-PolarBearCubs_PT-BR0512178061_UHD.jpg',
    // './BingWallpaper/20240228-BamburghCastleUK_PT-BR0750396632_UHD.jpg',
    // './BingWallpaper/20240229-Owlchicks_PT-BR1285033341_UHD.jpg',
    // './BingWallpaper/20240301-Schmetterlingswiese_PT-BR1454975701_UHD.jpg',
    // './BingWallpaper/20240302-ModicaItaly_PT-BR1634339196_UHD.jpg',
    // './BingWallpaper/20240303-KrugerLeopard_PT-BR1839115082_UHD.jpg',
    // './BingWallpaper/20240304-ArenalCostaRica_PT-BR2896313529_UHD.jpg',
    // './BingWallpaper/20240305-NandayParakeet_PT-BR2771660938_UHD.jpg',
    // './BingWallpaper/20240306-WahclellaFalls_PT-BR3300718426_UHD.jpg',
    // './BingWallpaper/20240307-TarragonaSpain_PT-BR3520793083_UHD.jpg',
    // './BingWallpaper/20240308-TateLightUp_PT-BR7094951242_UHD.jpg',
    // './BingWallpaper/20240309-ArdeAlba_PT-BR8363660380_UHD.jpg',
    // './BingWallpaper/20240310-BistiBlue_PT-BR3525071051_UHD.jpg',
    // './BingWallpaper/20240311-SleepyKoala_PT-BR9818387982_UHD.jpg',
    // './BingWallpaper/20240312-BryceSnow_PT-BR0096570080_UHD.jpg',
    // './BingWallpaper/20240313-MagadiFlamingos_PT-BR0452597039_UHD.jpg',
    // './BingWallpaper/20240314-CancaoDoExilio_PT-BR1504985587_UHD.jpg',
    // './BingWallpaper/20240315-AnzaBorregoBloom_PT-BR1895127264_UHD.jpg',
    // './BingWallpaper/20240316-BambooPanda_PT-BR2137672411_UHD.jpg',
    // './BingWallpaper/20240317-StFiniansBay_PT-BR2316790024_UHD.jpg',
    // './BingWallpaper/20240318-ElephantRock_PT-BR3465039308_UHD.jpg',
    // './BingWallpaper/20240319-SpringCaveDale_PT-BR8455080776_UHD.jpg',
    // './BingWallpaper/20240319-SpringFrog_PT-BR2957338911_UHD.jpg',
    // './BingWallpaper/20240320-SpringCaveDale_PT-BR3177593018_UHD.jpg',
    // './BingWallpaper/20240320-SpringFrog_PT-BR7201862349_UHD.jpg',
    // './BingWallpaper/20240321-BwindiNationalForest_PT-BR3676820157_UHD.jpg',
    // './BingWallpaper/20240322-WaikatoWater_PT-BR9033741044_UHD.jpg',
    // './BingWallpaper/20240323-ChapadaDiamantinaBahia_PT-BR8776626015_UHD.jpg',
    // './BingWallpaper/20240324-WhiteEyes_PT-BR8910495803_UHD.jpg',
    // './BingWallpaper/20240325-ColorfulHoli_PT-BR7363563541_UHD.jpg',
    // './BingWallpaper/20240326-HangRaiVietnam_PT-BR9135997938_UHD.jpg',
    // './BingWallpaper/20240327-TeatroColon_PT-BR9483499387_UHD.jpg',
    // './BingWallpaper/20240328-ShanghaiBlossoms_PT-BR9791195331_UHD.jpg',
    // './BingWallpaper/20240329-AniversarioSalvador_PT-BR0763407699_UHD.jpg',
    // './BingWallpaper/20240330-SleepySloth_PT-BR0186395932_UHD.jpg',
    // './BingWallpaper/20240331-HungarianEggs_PT-BR0431246025_UHD.jpg',
    // './BingWallpaper/20240401-PalazzoFarnese_PT-BR0676715061_UHD.jpg',
    // './BingWallpaper/20240402-SouthStackLight_PT-BR0876989984_UHD.jpg',
    // './BingWallpaper/20240403-KyrgyzstanRainbow_PT-BR1032098140_UHD.jpg',
    // './BingWallpaper/20240404-AntelopeBotswana_PT-BR1126611308_UHD.jpg',
    // './BingWallpaper/20240405-BahamasSpace_PT-BR0940093186_UHD.jpg',
    // './BingWallpaper/20240406-JapanHimeji_PT-BR1183252233_UHD.jpg',
    // './BingWallpaper/20240407-BeaverDenali_PT-BR1390611449_UHD.jpg',
    // './BingWallpaper/20240408-CuiabaAniversary_PT-BR5141528738_UHD.jpg',
    // './BingWallpaper/20240409-SkagitValleyTulips_PT-BR5378800364_UHD.jpg',
    // './BingWallpaper/20240410-OwlSiblings_PT-BR5674103316_UHD.jpg',
    // './BingWallpaper/20240411-DragonWaterfall_PT-BR5875441012_UHD.jpg',
    // './BingWallpaper/20240412-Curitiba_PT-BR8811404397_UHD.jpg',
    // './BingWallpaper/20240413-SunsetArchesNP_PT-BR6301905431_UHD.jpg',
    // './BingWallpaper/20240414-BowlingBallCali_PT-BR6942653750_UHD.jpg',
    // './BingWallpaper/20240415-RedBallBelgium_PT-BR7344009835_UHD.jpg',
    // './BingWallpaper/20240416-UnionSquareNYC_PT-BR7552214578_UHD.jpg',
    // './BingWallpaper/20240417-SpringCub_PT-BR7805959671_UHD.jpg',
    // './BingWallpaper/20240418-AvilaSpain_PT-BR7974063608_UHD.jpg',
    // './BingWallpaper/20240419-PovoIndigena_PT-BR1924645253_UHD.jpg',
    // './BingWallpaper/20240420-YellowstoneGeyser_PT-BR2303534903_UHD.jpg',
    // './BingWallpaper/20240421-CadesCove_PT-BR2584359483_UHD.jpg',
    // './BingWallpaper/20240422-EarthDayTurtle_PT-BR2849722316_UHD.jpg',
    // './BingWallpaper/20240423-TrinityDublin_PT-BR3116849937_UHD.jpg',
    // './BingWallpaper/20240423-TrinityDublin_PT-BR4634069744_UHD.jpg',
    // './BingWallpaper/20240424-TrilliumOntario_PT-BR3357394159_UHD.jpg',
    // './BingWallpaper/20240425-PenguinDirections_PT-BR3690073340_UHD.jpg',
    // './BingWallpaper/20240426-KalalochTree_PT-BR4023725758_UHD.jpg',
    // './BingWallpaper/20240427-LeucisticHummingbird_PT-BR4306978820_UHD.jpg',
    // './BingWallpaper/20240428-GuadalupeTexas_PT-BR4550245879_UHD.jpg',
    // './BingWallpaper/20240429-TulouFujian_PT-BR4910373349_UHD.jpg',
    // './BingWallpaper/20240430-CheetahRain_PT-BR5107827451_UHD.jpg',
    // './BingWallpaper/20240501-DiadaLiteraturaBrasileira_PT-BR6259851380_UHD.jpg',
    // './BingWallpaper/20240502-CratersOfTheMoon_PT-BR6520589652_UHD.jpg',
    // './BingWallpaper/20240503-DiadoSertanejo_PT-BR9682293877_UHD.jpg',
    // './BingWallpaper/20240504-JediMonastery_PT-BR8049739935_UHD.jpg',
    // './BingWallpaper/20240505-SanMiguelAllende_PT-BR8483156225_UHD.jpg',
    // './BingWallpaper/20240506-RiverNekarHeidelberg_PT-BR6227220024_UHD.jpg',
    // './BingWallpaper/20240507-LittleDuckling_PT-BR9050778673_UHD.jpg',
    // './BingWallpaper/20240508-IguazuTurism_PT-BR9760109650_UHD.jpg',
    // './BingWallpaper/20240509-EmirganPark_PT-BR9433604698_UHD.jpg',
    // './BingWallpaper/20240510-MisoolRajaAmpat_PT-BR6517717174_UHD.jpg',
    // './BingWallpaper/20240511-TexasIndigoBunting_PT-BR6730881258_UHD.jpg',
    // './BingWallpaper/20240512-GuanacoMother_PT-BR7069142219_UHD.jpg',
    // './BingWallpaper/20240513-NamibiaCanyon_PT-BR7314875835_UHD.jpg',
    // './BingWallpaper/20240514-CarlsbadNP_PT-BR7544935694_UHD.jpg',
    // './BingWallpaper/20240515-BlueCityIndia_PT-BR7765486791_UHD.jpg',
    // './BingWallpaper/20240516-DayOfLight_PT-BR7977320546_UHD.jpg',
    // './BingWallpaper/20240517-TarangireElephants_PT-BR9979896896_UHD.jpg',
    // './BingWallpaper/20240518-MuseumWhale_PT-BR0044062488_UHD.jpg',
    // './BingWallpaper/20240519-VernazzaItaly_PT-BR0108995686_UHD.jpg',
    // './BingWallpaper/20240520-HoneycombBee_PT-BR0168442685_UHD.jpg',
    // './BingWallpaper/20240521-MalaysiaTea_PT-BR0222561765_UHD.jpg',
    // './BingWallpaper/20240522-SnowGumTasmania_PT-BR0279882424_UHD.jpg',
    // './BingWallpaper/20240523-IndianStarTortoise_PT-BR0334099944_UHD.jpg',
    // './BingWallpaper/20240524-DiaNacionaldoCafe_PT-BR0388353116_UHD.jpg',
    // './BingWallpaper/20240525-MoroccoBenhaddou_PT-BR0472580311_UHD.jpg',
    // './BingWallpaper/20240526-MethowWildflowers_PT-BR0540541576_UHD.jpg',
    // './BingWallpaper/20240527-MataAtlantica_PT-BR0600772527_UHD.jpg',
    // './BingWallpaper/20240528-MeteoraMonastery_PT-BR0665856775_UHD.jpg',
    // './BingWallpaper/20240529-MullOtter_PT-BR0721243704_UHD.jpg',
    // './BingWallpaper/20240530-Everglades90th_PT-BR0782569600_UHD.jpg',
    // './BingWallpaper/20240531-YorkshireDalesNP_PT-BR5805097424_UHD.jpg',
    // './BingWallpaper/20240601-PrideMonthSF_PT-BR6281938141_UHD.jpg',
    // './BingWallpaper/20240602-CopenhagenBicycles_PT-BR5476760078_UHD.jpg',
    // './BingWallpaper/20240603-CapybaraEducation_PT-BR9998060500_UHD.jpg',
    // './BingWallpaper/20240604-ChestnutBeeEater_PT-BR6524596779_UHD.jpg',
    // './BingWallpaper/20240605-MadagascarRiver_PT-BR7232388819_UHD.jpg',
    // './BingWallpaper/20240606-LesBravesNormandy_PT-BR7484983029_UHD.jpg',
    // './BingWallpaper/20240607-HumpbackFamily_PT-BR7707157719_UHD.jpg',
    // './BingWallpaper/20240608-KillikRiverAlaska_PT-BR9004579454_UHD.jpg',
    // './BingWallpaper/20240609-BardenasBiosphere_PT-BR8155922865_UHD.jpg',
    // './BingWallpaper/20240610-OsakaNight_PT-BR8462311640_UHD.jpg',
    // './BingWallpaper/20240611-GemsbokBotswana_PT-BR8699513531_UHD.jpg',
    // './BingWallpaper/20240612-DiadosNamorado_PT-BR1152869085_UHD.jpg',
    // './BingWallpaper/20240613-RegistanUzbekistan_PT-BR8909125250_UHD.jpg',
    // './BingWallpaper/20240614-PeggysCove_PT-BR1473312250_UHD.jpg',
    // './BingWallpaper/20240615-NazareWave_PT-BR1726789452_UHD.jpg',
    // './BingWallpaper/20240616-FloresIsland_PT-BR1096612620_UHD.jpg',
    // './BingWallpaper/20240617-HummingThistle_PT-BR2010044953_UHD.jpg',
    // './BingWallpaper/20240618-LupinIceland_PT-BR2281677682_UHD.jpg',
    // './BingWallpaper/20240619-CuxhavenTower_PT-BR2536351203_UHD.jpg',
    // './BingWallpaper/20240620-KokinoMacedonia_PT-BR2816851215_UHD.jpg',
    // './BingWallpaper/20240621-IniciodoInverno_PT-BR1929239619_UHD.jpg',
    // './BingWallpaper/20240622-BrazilRainforest_PT-BR3213724204_UHD.jpg',
    // './BingWallpaper/20240623-DhakaBangladesh_PT-BR3551380225_UHD.jpg',
    // './BingWallpaper/20240624-FestasJuninas_PT-BR2004376750_UHD.jpg',
    // './BingWallpaper/20240625-FireWave_PT-BR3949258525_UHD.jpg',
    // './BingWallpaper/20240626-CardinalfishAnemone_PT-BR4236573966_UHD.jpg',
    // './BingWallpaper/20240627-FlorenceDuomo_PT-BR4528036954_UHD.jpg',
    // './BingWallpaper/20240628-Pride2024_PT-BR0771293980_UHD.jpg',
    // './BingWallpaper/20240629-TourCorsica_PT-BR5751262525_UHD.jpg',
    // './BingWallpaper/20240630-UbudBali_PT-BR6634868084_UHD.jpg',
    // './BingWallpaper/20240701-FisgardLighthouse_PT-BR7039409660_UHD.jpg',
    // './BingWallpaper/20240702-ItalicaRuins_PT-BR7394410327_UHD.jpg',
    // './BingWallpaper/20240703-MeerkatManor_PT-BR7654628186_UHD.jpg',
    // './BingWallpaper/20240704-ZaharaDeLaSierra_PT-BR7910795678_UHD.jpg',
    // './BingWallpaper/20240705-NoahBeach_PT-BR8215908491_UHD.jpg',
    // './BingWallpaper/20240706-ConwyRiver_PT-BR8493712176_UHD.jpg',
    // './BingWallpaper/20240707-YenBaiTerraces_PT-BR8757811796_UHD.jpg',
    // './BingWallpaper/20240708-AniversarioOuroPreto_PT-BR1746358764_UHD.jpg',
    // './BingWallpaper/20240709-TalampayaNP_PT-BR9006778184_UHD.jpg',
    // './BingWallpaper/20240710-CollaredAracari_PT-BR9257323315_UHD.jpg',
    // './BingWallpaper/20240711-GangiSicily_PT-BR9510016968_UHD.jpg',
    // './BingWallpaper/20240712-RainierWildflowers_PT-BR9770254578_UHD.jpg',
    // './BingWallpaper/20240713-CappadociaRocks_PT-BR0064255602_UHD.jpg',
    // './BingWallpaper/20240714-SilkyShark_PT-BR0331927489_UHD.jpg',
    // './BingWallpaper/20240715-TateishiPark_PT-BR0601453659_UHD.jpg',
    // './BingWallpaper/20240716-AncientOrkney_PT-BR0835986378_UHD.jpg',
    // './BingWallpaper/20240717-DiadoCurupira_PT-BR5262042998_UHD.jpg',
    // './BingWallpaper/20240718-MayotteCoral_PT-BR1070255850_UHD.jpg',
    // './BingWallpaper/20240719-DiaNacionaldoFutebol_PT-BR4614165115_UHD.jpg',
    // './BingWallpaper/20240720-MineralMoon_PT-BR1317802439_UHD.jpg',
    // './BingWallpaper/20240721-ZanzibarBoats_PT-BR1541762225_UHD.jpg',
    // './BingWallpaper/20240722-HammockCamping_PT-BR1798965099_UHD.jpg',
    // './BingWallpaper/20240723-MethoniCastle_PT-BR2033564506_UHD.jpg',
    // './BingWallpaper/20240724-YoungJaguar_PT-BR2280455172_UHD.jpg',
    // './BingWallpaper/20240725-SmokyMountainTrail_PT-BR2635483756_UHD.jpg',
    // './BingWallpaper/20240726-PontNeuf_PT-BR6985503586_UHD.jpg',
    // './BingWallpaper/20240727-RhinelandVineyards_PT-BR7268269161_UHD.jpg',
    // './BingWallpaper/20240728-BeachHutsSweden_PT-BR7531114296_UHD.jpg',
    // './BingWallpaper/20240729-DiadoAgricultor_PT-BR1621260840_UHD.jpg',
    // './BingWallpaper/20240730-GimignanoTuscany_PT-BR7820946889_UHD.jpg',
    // './BingWallpaper/20240731-HoodoosBryce_PT-BR8116004606_UHD.jpg',
    // './BingWallpaper/20240801-KaptaiLake_PT-BR8351405372_UHD.jpg',
    // './BingWallpaper/20240802-TrunkBay_PT-BR8573788345_UHD.jpg',
    // './BingWallpaper/20240803-WulongKarst_PT-BR9259543869_UHD.jpg',
    // './BingWallpaper/20240804-DiaInternacionaldosAvos_PT-BR2289016069_UHD.jpg',
    // './BingWallpaper/20240805-HertfordshireLavender_PT-BR9531166050_UHD.jpg',
    // './BingWallpaper/20240806-MolokiniHawaii_PT-BR9827408111_UHD.jpg',
    // './BingWallpaper/20240807-MichiganLighthouse_PT-BR0055198491_UHD.jpg',
    // './BingWallpaper/20240808-SpottedOwlet_PT-BR0320206589_UHD.jpg',
    // './BingWallpaper/20240809-IncaRuinPeru_PT-BR4364071618_UHD.jpg',
    // './BingWallpaper/20240810-JoshuaTreeNP_PT-BR8498081592_UHD.jpg',
    // './BingWallpaper/20240811-DiadosPais_PT-BR1045421907_UHD.jpg',
    // './BingWallpaper/20240812-ElephantsAmboseli_PT-BR3607711073_UHD.jpg',
    // './BingWallpaper/20240813-DugiOtokCroatia_PT-BR3949170501_UHD.jpg',
    // './BingWallpaper/20240814-WatarrkaLizard_PT-BR4397893741_UHD.jpg',
    // './BingWallpaper/20240815-HangCave_PT-BR4594901649_UHD.jpg',
    // './BingWallpaper/20240816-JapanRollerCoaster_PT-BR6472241100_UHD.jpg',
    // './BingWallpaper/20240817-AlfanzinaLighthouse_PT-BR6712020565_UHD.jpg',
    // './BingWallpaper/20240818-HuntingtonBeach_PT-BR8909327744_UHD.jpg',
    // './BingWallpaper/20240819-RegataSanGines_PT-BR4759271274_UHD.jpg',
    // './BingWallpaper/20240820-TetonSunrise_PT-BR5413477464_UHD.jpg',
    // './BingWallpaper/20240821-NazcaBooby_PT-BR5782154593_UHD.jpg',
    // './BingWallpaper/20240822-DiadoFolclore_PT-BR9451693617_UHD.jpg',
    // './BingWallpaper/20240823-PrasatPhanom_PT-BR0925050083_UHD.jpg',
    // './BingWallpaper/20240824-KatahdinWoods_PT-BR1618400732_UHD.jpg',
    // './BingWallpaper/20240825-SwiftcurrentLake_PT-BR2467952516_UHD.jpg',
    // './BingWallpaper/20240826-PalmyraAtoll_PT-BR3061095594_UHD.jpg',
    // './BingWallpaper/20240827-YoungCaiman_PT-BR3430658396_UHD.jpg',
    // './BingWallpaper/20240828-ParalympicsParis_PT-BR3706012931_UHD.jpg',
    // './BingWallpaper/20240829-CastellfollitSpain_PT-BR4036017391_UHD.jpg',
    // './BingWallpaper/20240830-WhaleSharkDay_PT-BR4441364252_UHD.jpg',
    // './BingWallpaper/20240831-DjanetAlgeria_PT-BR4680900903_UHD.jpg',
    // './BingWallpaper/20240901-ThamesLondon_PT-BR5304149458_UHD.jpg',
    // './BingWallpaper/20240902-BuracodasAraras_PT-BR5512338223_UHD.jpg',
    // './BingWallpaper/20240903-AlpineLakes_PT-BR5855305419_UHD.jpg',
    // './BingWallpaper/20240904-DuskyOwls_PT-BR7151379971_UHD.jpg',
    // './BingWallpaper/20240905-RioNegroSolimoes_PT-BR3787535047_UHD.jpg',
    // './BingWallpaper/20240906-GlenariffPark_PT-BR3219733810_UHD.jpg',
    // './BingWallpaper/20240907-IndependenciaBrasil_PT-BR0488632296_UHD.jpg',
    // './BingWallpaper/20240908-StockholmLibrary_PT-BR3203792144_UHD.jpg',
    // './BingWallpaper/20240909-IguazuRainbow_PT-BR7775661290_UHD.jpg',
    // './BingWallpaper/20240910-BridgeLisbon_PT-BR7212632262_UHD.jpg',
    // './BingWallpaper/20240911-EltzCastle_PT-BR6770414719_UHD.jpg',
    // './BingWallpaper/20240912-DolphinReunion_PT-BR8025622682_UHD.jpg',
    // './BingWallpaper/20240913-PointReyes_PT-BR8277913386_UHD.jpg',
    // './BingWallpaper/20240914-RapaNuiSunrise_PT-BR6063530742_UHD.jpg',
    // './BingWallpaper/20240915-CalabriaPeperoncino_PT-BR8530214805_UHD.jpg',
    // './BingWallpaper/20240916-SunriseWallabies_PT-BR5783760197_UHD.jpg',
    // './BingWallpaper/20240917-MidAutumnSingapore_PT-BR5635809883_UHD.jpg',
    // './BingWallpaper/20240918-GujoHachiman_PT-BR3323033809_UHD.jpg',
    // './BingWallpaper/20240919-DiaNacionaldoTeatro_PT-BR7232325945_UHD.jpg',
    // './BingWallpaper/20240920-OcracokeLight_PT-BR0175808147_UHD.jpg',
    // './BingWallpaper/20240921-DiadaArvore_PT-BR9942268995_UHD.jpg',
    // './BingWallpaper/20240922-Primavera_PT-BR5788355112_UHD.jpg',
    // './BingWallpaper/20240923-IcebergOtter_PT-BR0553443956_UHD.jpg',
    // './BingWallpaper/20240924-SkaftafellWaterfall_PT-BR0775400551_UHD.jpg',
    // './BingWallpaper/20240925-GiantSequoias_PT-BR0989155735_UHD.jpg',
    // './BingWallpaper/20240926-LittleToucanet_PT-BR1307591671_UHD.jpg',
    // './BingWallpaper/20240927-VeniceAerial_PT-BR3049943279_UHD.jpg',
    // './BingWallpaper/20240928-FloridaSeashore_PT-BR4145108998_UHD.jpg',
    // './BingWallpaper/20240929-ConnecticutBridge_PT-BR4352188943_UHD.jpg',
    // './BingWallpaper/20240930-WalrusNorway_PT-BR4604487839_UHD.jpg',
    // './BingWallpaper/20241001-HalfDomeYosemite_PT-BR4764561878_UHD.jpg',
    // './BingWallpaper/20241002-WindRiverAlaska_PT-BR4944339151_UHD.jpg',
    // './BingWallpaper/20241003-TajMahalReflection_PT-BR5120942939_UHD.jpg',
    // './BingWallpaper/20241004-EuropaMoon_PT-BR6260569357_UHD.jpg',
    // './BingWallpaper/20241005-MaraMigration_PT-BR7440860691_UHD.jpg',
    // './BingWallpaper/20241006-CoyoteGulch_PT-BR8564618055_UHD.jpg',
    // './BingWallpaper/20241007-ElbePhilharmonic_PT-BR9107755270_UHD.jpg',
    // './BingWallpaper/20241008-MototiOctopus_PT-BR0386452744_UHD.jpg',
    // './BingWallpaper/20241009-AspensColorado_PT-BR8036769299_UHD.jpg',
    // './BingWallpaper/20241010-SoranoItaly_PT-BR8638738713_UHD.jpg',
    // './BingWallpaper/20241011-CelticColours_PT-BR9042410710_UHD.jpg',
    // './BingWallpaper/20241012-FelizDiadasCriancas_PT-BR6983342881_UHD.jpg',
    // './BingWallpaper/20241013-AlcazarSeville_PT-BR9775263782_UHD.jpg',
    // './BingWallpaper/20241014-CocoBeach_PT-BR0695922930_UHD.jpg',
    // './BingWallpaper/20241015-ElephantTeacher_PT-BR6921941046_UHD.jpg',
    // './BingWallpaper/20241016-FossilsDorset_PT-BR5587878603_UHD.jpg',
    // './BingWallpaper/20241017-KochiaJapan_PT-BR6014250762_UHD.jpg',
    // './BingWallpaper/20241018-CentralParkAutumn_PT-BR6612852455_UHD.jpg',
    // './BingWallpaper/20241019-DenderaTemple_PT-BR6539845196_UHD.jpg',
    // './BingWallpaper/20241020-SmilingSloth_PT-BR6480806367_UHD.jpg',
    // './BingWallpaper/20241021-AutumnCypress_PT-BR6434540619_UHD.jpg',
    // './BingWallpaper/20241022-MonsterDoor_PT-BR8050114747_UHD.jpg',
    // './BingWallpaper/20241023-MadameSherriCastle_PT-BR6347507629_UHD.jpg',
    // './BingWallpaper/20241024-GreatOwl_PT-BR6294923796_UHD.jpg',
    // './BingWallpaper/20241025-MontBlancMassif_PT-BR6216119824_UHD.jpg',
    // './BingWallpaper/20241026-GhostForest_PT-BR6077995597_UHD.jpg',
    // './BingWallpaper/20241027-PolarBearHug_PT-BR5987210106_UHD.jpg',
    // './BingWallpaper/20241028-PumpkinMist_PT-BR5900196998_UHD.jpg',
    // './BingWallpaper/20241029-DiadoLivroRJ_PT-BR5813515082_UHD.jpg',
    // './BingWallpaper/20241030-HauntedEdinburgh_PT-BR5740528750_UHD.jpg',
    // './BingWallpaper/20241031-DiadoSaci_PT-BR3042315379_UHD.jpg',
    // './BingWallpaper/20241101-VineyardsBlackForestFall_PT-BR1234639247_UHD.jpg',
    // './BingWallpaper/20241102-BisonYellowstone_PT-BR0601244596_UHD.jpg',
    // './BingWallpaper/20241103-YucatanBiosphere_PT-BR0460941860_UHD.jpg',
    // './BingWallpaper/20241104-LencoisMaranhao_PT-BR0859804056_UHD.jpg',
    // './BingWallpaper/20241105-DiadaLinguaPortuguesa_PT-BR1619682232_UHD.jpg',
    // './BingWallpaper/20241106-ShiShiBeach_PT-BR2103643981_UHD.jpg',
    // './BingWallpaper/20241107-CanadaWolves_PT-BR2357751401_UHD.jpg',
    // './BingWallpaper/20241108-GlacialRivers_PT-BR2577171994_UHD.jpg',
    // './BingWallpaper/20241109-MoroccoMilkyWay_PT-BR2736576550_UHD.jpg',
    // './BingWallpaper/20241110-YucatanFlamingos_PT-BR2968915702_UHD.jpg',
    // './BingWallpaper/20241111-Banff24_PT-BR3167336781_UHD.jpg',
    // './BingWallpaper/20241112-CoveArch_PT-BR3365210428_UHD.jpg',
    // './BingWallpaper/20241113-KelpForest_PT-BR4486917005_UHD.jpg',
    // './BingWallpaper/20241114-ManarolaItaly_PT-BR4966210433_UHD.jpg',
    // './BingWallpaper/20241115-RepublicaBR_PT-BR7751607802_UHD.jpg',
    // './BingWallpaper/20241116-FrieslandNetherlands_PT-BR8090828736_UHD.jpg',
    // './BingWallpaper/20241117-RedStag_PT-BR8362159412_UHD.jpg',
    // './BingWallpaper/20241118-PorthcawlLighthouse_PT-BR8599692510_UHD.jpg',
    // './BingWallpaper/20241119-TasmansArch_PT-BR8823523988_UHD.jpg',
    // './BingWallpaper/20241120-ConscienciaNegraCamelia_PT-BR9267638631_UHD.jpg',
    // './BingWallpaper/20241121-LionCubs_PT-BR9649632612_UHD.jpg',
    // './BingWallpaper/20241122-ZafraCastle_PT-BR0233064740_UHD.jpg',
    // './BingWallpaper/20241123-FibonacciAloe_PT-BR0422432793_UHD.jpg',
    // './BingWallpaper/20241124-SonomaCoast_PT-BR0576687853_UHD.jpg',
    // './BingWallpaper/20241125-AmboseliGiraffes_PT-BR7213408743_UHD.jpg',
    // './BingWallpaper/20241126-TrulliGrove_PT-BR0953922642_UHD.jpg',
    // './BingWallpaper/20241127-SemoisRiver_PT-BR1104311841_UHD.jpg',
    // './BingWallpaper/20241128-AssiniboineTS_PT-BR1279222621_UHD.jpg',
    // './BingWallpaper/20241129-MtStMichel_PT-BR7244299173_UHD.jpg',
    // './BingWallpaper/20241130-KilchurnAutumn_PT-BR7553426712_UHD.jpg',
    // './BingWallpaper/20241201-IcebergsAntarctica_PT-BR8796328683_UHD.jpg',
    // './BingWallpaper/20241202-DiadoSamba_PT-BR6499916889_UHD.jpg',
  ];

var fs = require("fs");
var PdfPrinter = require('pdfmake/src/printer');
var fonts = {
    Roboto: {
        normal: 'fonts/Roboto/Roboto-Regular.ttf',
        bold: 'fonts/Roboto/Roboto-Medium.ttf',
        italics: 'fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
    }
};
var printer = new PdfPrinter(fonts);


main();




/*

- no dimension ele le todo o arquivo e salva em memoria
- no read ele retorna o cache e limpa a memoria

- se for chamado de novo o dimension ele imprime um 'cache miss on dimension'
- se for chamado de novo o read ele imprime um 'cache miss on read'

*/


function _readStreamSync(stream) {
  let done = false;
  let result = null;
  let error = null;

  _readStream(stream)
    .then((data) => {
      result = data;
      done = true;
    })
    .catch((err) => {
      error = err;
      done = true;
    });
  deasync.loopWhile(() => !done);
  if (error) {
    throw error;
  }
  return result;
}

function getImageDimensions(stream) {
  let done = false;
  let result = null;
  let error = null;

  _measureStream(stream)
    .then((data) => {
      result = data;
      done = true;
    })
    .catch((err) => {
      error = err;
      done = true;
    });
  deasync.loopWhile(() => !done);
  if (error) {
    throw error;
  }
  return result;
}



function _readStream(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

async function  _measureStream(stream) {
    const chunk = await this._readChunk(stream, 32);
    return this._measureBuffer(chunk);
  }

  function  _readChunk(stream, length) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      let bytesRead = 0;

      stream.on('data', (chunk) => {
        chunks.push(chunk);
        bytesRead += chunk.length;

        if (bytesRead >= length) {
          stream.pause();
          resolve(Buffer.concat(chunks, length));
        }
      });

      stream.on('end', () => reject(new Error('Stream ended before enough data was read')));
      stream.on('error', reject);
    });
  }

  function  _measureBuffer(buffer) {
    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      return this._measureJPEG(buffer);
    } else if (buffer[0] === 0x89 && buffer.toString('ascii', 1, 4) === 'PNG') {
      return this._measurePNG(buffer);
    } else {
      throw new Error('Unknown image format.');
    }
  }

  function  _measureJPEG(buffer) {
    // JPEG dimensions are stored in SOF (Start of Frame) markers
    let offset = 2; // Skip the first 2 bytes (0xFFD8)
    while (offset < buffer.length) {
      const marker = buffer.readUInt16BE(offset);
      offset += 2;

      if (marker >= 0xffc0 && marker <= 0xffcf && marker !== 0xffc4 && marker !== 0xffcc) {
        const height = buffer.readUInt16BE(offset + 3);
        const width = buffer.readUInt16BE(offset + 5);
    // If EXIF orientation calls for it, swap width and height
    if (orientation > 4) {
      return { width: image.height, height: image.width };
    }
    return { width, height };
      } else {
        offset += buffer.readUInt16BE(offset);
      }
    }
    throw new Error('Invalid JPEG format.');
  }

  function  _measurePNG(buffer) {
    // PNG dimensions are in the IHDR chunk, starting at byte 16
    if (buffer.toString('ascii', 12, 16) !== 'IHDR') {
      throw new Error('Invalid PNG format.');
    }
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);

    return { width: width, height: height };
  }

  function _readFirst32Bytes(filePath) {
    const buffer = Buffer.alloc(32);
    try {
        const fd = fs.openSync(filePath, 'r');
        const bytesRead = fs.readSync(fd, buffer, 0, 32, 0);
        fs.closeSync(fd);
        console.log(`Lidos ${bytesRead} bytes:`, buffer.toString('utf-8'));
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
    }
  }


async function main() {

    // const createStream = (filePath) => ({
    //   read: function () {
    //     return _readStreamSync(fs.createReadStream(filePath));
    //     return fs.readFileSync(filePath);
    //   },
    //   dimensions: function () {
    //     // const data = this.read();
    //     // return getImageDimensions(data);
    //     return _measureBuffer(_readFirst32Bytes(filePath));
    //   },
    // });

  const _readSync = (filePath) => fs.readFileSync(filePath);
  const _measure = (cache) => fs.readFileSync(filePath);



  const createStream = (filePath) => {
    let cache = null;
    return {
      dimensions: function () {
      if (!cache) {
        console.log('Image cache miss on dimension()');
        cache = _readSync(filePath);
      }
      return _measure(cache);
      },
      read: function () {
      if (!cache) {
        console.log('Image cache miss on read()');
        cache = _readSync(filePath);
      }
      const content = cache;
      cache = null;
      return content;
      },
    };
  };

  const dataStreams = images.reduce((streams, filePath, index) => {
      streams[`stream${index + 1}`] = createStream(filePath);
      return streams;
  }, {});
  console.log(dataStreams);

  let html_source = `
      Exemplo de PDF com ${images.length} imagens
  `;

  images.forEach((_, index) => {
    const streamId = `stream${index + 1}`;
    html_source += `    <img src="" data-stream-id="${streamId}" width="640" height="320" />\n`;
  });

  var html = htmlToPdfMake( html_source, {
    dataStreams: dataStreams,
    window: window, tableAutoSize: true } );
//   console.log(JSON.stringify(html));

  var docDefinition = {
    content: [
      html
    ],
    pageBreakBefore: function(currentNode) {
      // we add a page break before elements with the classname "pdf-pagebreak-before"
      return currentNode.style && currentNode.style.indexOf('pdf-pagebreak-before') > -1;
    },
    styles:{
      red:{
        color:'red'
      },
      blue:{
        color:'blue'
      },
      bold:{
        bold:true
      },
      'html-h6':{
        color:'purple'
      },
      'html-strong':{
        color:'purple'
      },
      'a':{
        bold:true
      },
      'b':{
        italics: true
      },
      'c':{
        color:'red',
        italics: false
      },
      'with-spaces':{
        preserveLeadingSpaces: true
      }
    }
  };

    const initialMemory = process.memoryUsage().heapUsed;
    console.log(`Memória inicial: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);

  var pdfDocGenerator = printer.createPdfKitDocument(docDefinition, {
    // see https://pdfmake.github.io/docs/0.1/document-definition-object/tables/
    exampleLayout: {
      hLineColor: function (rowIndex, node, colIndex) {
        if (rowIndex === node.table.body.length) return 'blue';
        return rowIndex <= 1 ? 'red' : '#dddddd';
      },
      vLineColor: function (colIndex, node, rowIndex) {
        if (rowIndex === 0) return 'red';
        return rowIndex > 0 && (colIndex === 0 || colIndex === node.table.body[0].length) ? 'blue' : 'black';
      }
    }
  });

  pdfDocGenerator.pipe(fs.createWriteStream('example_img_stream2.pdf')).on('finish',function(){
      //success
  });
  pdfDocGenerator.end();

  console.log('--> example_img_stream2.pdf')


    const finalMemory = process.memoryUsage().heapUsed;
    console.log(`Memória final: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(
        `Memória máxima usada: ${((finalMemory - initialMemory) / 1024 / 1024).toFixed(2)} MB`
    );


//   pdfDocGenerator.getBuffer(function(buffer) {
//     fs.writeFileSync('example_img_stream2.pdf', buffer);
//     console.log('--> example_img_stream2.pdf')
//   });

}

function base64ToStream(base64) {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}



