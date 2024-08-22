import { ReactNode } from "react"
import PageThumbnail from "../../components/PageThumbnail"
import { Artwork } from "../../core/Artwork"
import { PageDescription } from "../../core/Page"
import { date } from "../../utils/helper"
import { TextLink } from "../../components/Link"
import ArtworkView from "../../views/ArtworkView"
import { ImageLoader } from "../../components/ImageLoader"
import { MapElements, TextToMap } from "./WalspergerData"

export type WalspergerMap = Artwork

export const walspergerMap: WalspergerMap = {
  id: "walsperger",
  name: "Walsperger Weltkarte",
  description: "Reinterpretation der Weltkarte des Andreas Walsperger",
  year: 2024,
  size: { width: 7500, height: 7500 },
  defaultIndex: 2,
  layer: [
    {
      id: "layer1",
      name: "Base Map",
      description: "...",
      inner: <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/walsperger/walsperger-1.jpg' />,
    },
    {
      id: "layer1",
      name: "Base Map",
      description: "...",
      inner: <MapElements />,
    },
  ],
  points: []
}

export const walspergerPage: PageDescription = {
  title: 'Walsperger Weltkarte',
  id: 'walsperger',
  description: 'Reinterpretation der Weltkarte des Andreas Walsperger',
  date: date(5, 5, 2024),
  tags: ['art', 'map'],
  thumbnail: <PageThumbnail color='indigo' label='Walsperger Weltkarte' />,
  element: <ArtworkView artwork={walspergerMap} />
}

export default walspergerPage


export const mapText = [
  // Städte
  { label: <div>Aachen</div>, position: { x: 5503.623, y: 4384.959 } },
  { label: <div>Afrika</div>, position: { x: 5073.2354, y: 2768.1714 } },
  { label: <div>Afrika-See</div>, position: { x: 4959.3184, y: 2243.877 } },
  { label: <div>Akkon</div>, position: { x: 3789.5156, y: 3271.1172 } },
  { label: <div>Alexandria</div>, position: { x: 4016.5029, y: 2987.3135 } },
  { label: <div>Antiochia</div>, position: { x: 3613.6592, y: 3320.3008 } },
  { label: <div>Arabien</div>, position: { x: 3298.9038, y: 2571.3652 } },
  { label: <div>Ararat</div>, position: { x: 3350.6665, y: 4122.5234 } },
  { label: <div>Armenien</div>, position: { x: 3521.918, y: 3808.1484 } },
  { label: <div>Asien</div>, position: { x: 3832.6016, y: 3656.7876 } },
  { label: <div>Asow</div>, position: { x: 3736.2261, y: 4420.3262 } },
  { label: <div>Athen</div>, position: { x: 4590.3682, y: 3445.0884 } },
  { label: <div>Atlantisches Gebirge</div>, position: { x: 5182.7705, y: 2440.499 } },
  { label: <div>Avignon</div>, position: { x: 5638.6387, y: 3921.582 } },
  { label: <div>Bagdad</div>, position: { x: 2828.5513, y: 3647.2192 } },
  { label: <div>Barcelona</div>, position: { x: 5748.3008, y: 3718.2344 } },
  { label: <div>Bayern</div>, position: { x: 5177.7607, y: 4229.8018 } },
  { label: <div>Belgrad</div>, position: { x: 4695.1973, y: 4075.8643 } },
  { label: <div>Berg Sinai</div>, position: { x: 3300.9521, y: 2673.7656 } },
  { label: <div>Bergen</div>, position: { x: 5792.5244, y: 4846.9678 } },
  { label: <div>Bornholm</div>, position: { x: 4782.6826, y: 5208.7529 } },
  { label: <div>Bozen</div>, position: { x: 5138.5381, y: 4140.9131 } },
  { label: <div>Braila</div>, position: { x: 4538.3438, y: 4055.832 } },
  { label: <div>Braunschweig</div>, position: { x: 5175.5566, y: 4525.7822 } },
  { label: <div>Breslau</div>, position: { x: 4778.2295, y: 4469.1455 } },
  { label: <div>Brügge</div>, position: { x: 5651.1514, y: 4330.0176 } },
  { label: <div>Byzacena</div>, position: { x: 5294.0225, y: 2667.894 } },
  { label: <div>Calais</div>, position: { x: 5615.9385, y: 4174.1699 } },
  { label: <div>Canterbury</div>, position: { x: 5843.9492, y: 4193.2109 } },
  { label: <div style={{fontSize: "50px"}}>China</div>, position: { x: 3156.4395, y: 4537.4844 } },
  { label: <div>Cyrenaika</div>, position: { x: 5256.207, y: 2827.8936 } },
  { label: <div>Damaskus</div>, position: { x: 3588.3779, y: 3403.9634 } },
  { label: <div>Danzig</div>, position: { x: 4844.1895, y: 4644.5225 } },
  { label: <div>Der Nordpol befindet sich unter diesem Gebiet und merke, <br/> 
      dass die Gegend um den Nordpol wegen übergroßer Kälte, <br/> die dort zur ständigen Vereisung führt, <br/> unbewohnbar ist und man nennt diesen Teil den Norden.</div>, position: { x: 3199.5488, y: 5609.6865 } },
  { label: <div>Der Südpol liegt gegenüber <br/> vom Nordpol und das <br/> Land ist unbewohnbar</div>, position: { x: 3224.8833, y: 732.9097 } },
  { label: <div>Die Dreigesichtigen mit drei Gesichtern</div>, position: { x: 1801.6008, y: 1432.2242 } },
  { label: <div>Dijon</div>, position: { x: 5598.2803, y: 4130.8896 } },
  { label: <div>Dort haben <br/>sie Ohren, <br/>die den <br/>Kopf bedecken</div>, position: { x: 1240.2773, y: 4107.8613 } },
  { label: <div>Drittes Klima, <br/> Klima von Rhodos</div>, position: { x: 6541.2695, y: 3165.1694 } },
  { label: <div>Edelsteininsel</div>, position: { x: 2954.064, y: 2288.9839 } },
  { label: <div>Erfurt</div>, position: { x: 5236.4668, y: 4431.3604 } },
  { label: <div>Erstes, <br/> meroesches Klima</div>, position: { x: 6230.6934, y: 2035.0576 } },
  { label: <div>Estland</div>, position: { x: 4183.3096, y: 4566.6992 } },
  { label: <div>Euböa</div>, position: { x: 4341.8633, y: 3484.9453 } },
  { label: <div>Euphrat</div>, position: { x: 3370.4487, y: 3616.147 } },
  { label: <div>Famagusta</div>, position: { x: 4084.3115, y: 3189.3521 } },
  { label: <div>Flandern</div>, position: { x: 5419.3027, y: 4316.5654 } },
  { label: <div>Florenz</div>, position: { x: 5239.8359, y: 3857.1973 } },
  { label: <div>Florenz</div>, position: { x: 5239.8359, y: 3857.1973 } },
  { label: <div>Fünftes, römisches Klima</div>, position: { x: 6559.3887, y: 3629.0552 } },
  { label: <div>Ganges</div>, position: { x: 1300.0151, y: 3800.116 } },
  { label: <div>Gebiet der Amazonen</div>, position: { x: 2615.0518, y: 3480.7031 } },
  { label: <div>Gebiet <br/>der Barbaren</div>, position: { x: 4776.4316, y: 2729.9438 } },
  { label: <div>Gebiet der <br/> Meder</div>, position: { x: 2922.4331, y: 3581.9346 } },
  { label: <div>Gebiet des unteren,<br/>  pharaonischen Nils</div>, position: { x: 4000.0195, y: 2392.0845 } },
  { label: <div>Genf</div>, position: { x: 5430.4795, y: 4078.6162 } },
  { label: <div>Genua</div>, position: { x: 5444.5254, y: 3964.5254 } },
  { label: <div>Genua</div>, position: { x: 5444.5254, y: 3964.5254 } },
  { label: <div>Goldberge</div>, position: { x: 1758.9736, y: 2678.6743 } },
  { label: <div>Goldinsel</div>, position: { x: 2340, y: 2740 } },
  { label: <div>Gotland</div>, position: { x: 4765.1484, y: 4818.8398 } },
  { label: <div>Graz</div>, position: { x: 4880.8887, y: 4198.6973 } },
  { label: <div>Graz</div>, position: { x: 4880.8887, y: 4198.6973 } },
  { label: <div>Griechenland</div>, position: { x: 4380.5635, y: 3723.1289 } },
  { label: <div style={{fontSize: "45px"}}>Griechisches Meer</div>, position: { x: 3868.1465, y: 3950.7285 } },
  { label: <div>Großes indisches Meer</div>, position: { x: 1798.3325, y: 2092.6724 } },
  { label: <div>Hamburg</div>, position: { x: 5427.3525, y: 4537.4863 } },
  { label: <div>Hauptstadt der Tataren</div>, position: { x: 3772.498, y: 4764.8613 } },
  { label: <div>Hauptstadt von <br/> China, wo der <br/> Großkahn regiert</div>, position: { x: 2627.8643, y: 4576.3857 } },
  { label: <div>Hauptstadt von Indien, <br/> wo der Priesterkönig <br/> Johannes lebt</div>, position: { x: 1728.0835, y: 4240.1807 } },
  { label: <div>Haus des David</div>, position: { x: 3105.1904, y: 3436.5435 } },
  { label: <div>Heilender See</div>, position: { x: 1379.7114, y: 4361.5732 } },
  { label: <div>Hermannstadt</div>, position: { x: 4422.7178, y: 4262.3506 } },
  { label: <div>Hier ermorden die Kinder<br/>  ihre Eltern und richten<br/>  mit deren Fleisch ein Festmahl aus</div>, position: { x: 2327.2134, y: 1962.5117 } },
  { label: <div>Hier essen die Menschen<br/>  Menschenfleisch</div>, position: { x: 2149.5386, y: 4779.9336 } },
  { label: <div>Hier gibt es ein Bildnis <br/> der Pallas, die neun Köpfe hat, <br/> drei menschliche und <br/> sechs Schlangenköpfe</div>, position: { x: 5550.3135, y: 2325.999 } },
  { label: <div>Hier gibt es<br/> Riesenameisen</div>, position: { x: 1678.0215, y: 2359.0947 } },
  { label: <div>Hier haben <br/>die Frauen <br/>Bärte</div>, position: { x: 1450.188, y: 4612.9512 } },
  { label: <div>Hier haben die <br/>Menschen Fuchsschwänze</div>, position: { x: 4985.9111, y: 1913.3213 } },
  { label: <div>Hier haben <br/> die Menschen<br/>  Hörner</div>, position: { x: 5831.5176, y: 1724.3384 } },
  { label: <div>Hier kämpfen<br/>  Pygmäen<br/>  gegen Kraniche.</div>, position: { x: 2300.9858, y: 4421.1191 } },
  { label: <div>Hier kämpfen <br/> Riesen mit Drachen.</div>, position: { x: 1433.7598, y: 1950.02 } },
  { label: <div>Hier leben die <br/> Zenophalen, <br/> die Hundeköpfe haben</div>, position: { x: 2503.4458, y: 5079.9678 } },
  { label: <div>Hier leben einbeinige Menschen, <br/> die sehr schnell laufen können</div>, position: { x: 3041.1904, y: 943.1235 } },
  { label: <div>Hier rastete<br/> der heilige Thomas</div>, position: { x: 2603.8291, y: 2398.3623 } },
  { label: <div>Hier sind zwei<br/> kalte Quellen</div>, position: { x: 4846.625, y: 2626.3062 } },
  { label: <div>Stirbt hier ein Mann,<br/>  wird seine Ehefrau <br/> mit ihm begraben.  </div>, position: { x: 1990.625, y: 3820.3062 } },
  { label: <div>Hier verbergen <br/> sich die Menschen <br/> bei Regen unter ihren Füßen</div>, position: { x: 4613.1816, y: 1699.6396 } },
  { label: <div>Hier werden Ostbäume angebetet.</div>, position: { x: 2963.21, y: 1836.4441 } },
  { label: <div>Hier wird <br/> Pfeffer verkauft</div>, position: { x: 2910.7627, y: 2727.2041 } },
  { label: <div style={{fontSize: "45px"}}>Hier wohnt <br/> König Casper</div>, position: { x: 2120.9756, y: 3020.3315 } },
  { label: <div>Insel der Jupitier <br/> oder des Unsterblichen, <br/> wo kein Mensch stirbt</div>, position: { x: 5030.6094, y: 1250.6646 } },
  { label: <div>Irland</div>, position: { x: 5963.5352, y: 4432.5059 } },
  { label: <div>Island</div>, position: { x: 5654.1592, y: 4955.1836 } },
  { label: <div>Jalta</div>, position: { x: 4032.8535, y: 4120.2891 } },
  { label: <div>Java</div>, position: { x: 1742.4087, y: 1784.1343 } },
  { label: <div>Jericho</div>, position: { x: 3427.2056, y: 3303.3447 } },
  { label: <div>Jerusalem</div>, position: { x: 3535.7939, y: 3281.1147 } },
  { label: <div>Kairo</div>, position: { x: 3936.3438, y: 2913.5371 } },
  { label: <div>Kanarische Inseln</div>, position: { x: 6100.4092, y: 2800.5752 } },
  { label: <div>Kap Fer</div>, position: { x: 5767.0752, y: 3290.3848 } },
  { label: <div>Kap Finisterre</div>, position: { x: 6159.6924, y: 3729.5293 } },
  { label: <div>Karthago</div>, position: { x: 5381.2061, y: 3130.9546 } },
  { label: <div style={{fontSize: "50px"}}>Kaspisches Meer</div>, position: { x: 2850.5645, y: 4047.2061 } },
  { label: <div>Kilija</div>, position: { x: 4303.001, y: 4001.3438 } },
  { label: <div>Kilkenny</div>, position: { x: 6025.4297, y: 4345.3574 } },
  { label: <div>Kolberg</div>, position: { x: 4949.8184, y: 4553.9277 } },
  { label: <div>Köln</div>, position: { x: 5457.4336, y: 4413.7451 } },
  { label: <div>Königreich Attancia: <br/> Hier wird der König nach<br/>  einem Jahr enthauptet</div>, position: { x: 4185.7021, y: 1342.9282 } },
  { label: <div>Königreich Eurica</div>, position: { x: 2106.9878, y: 1500.3618 } },
  { label: <div>Konstantinopel</div>, position: { x: 4408.6113, y: 3816.7119 } },
  { label: <div>Konstanz</div>, position: { x: 5344.751, y: 4189.3799 } },
  { label: <div>Kopenhagen</div>, position: { x: 5345.3281, y: 4690.3945 } },
  { label: <div>Korfu</div>, position: { x: 4854.1143, y: 3627.4302 } },
  { label: <div>Korsika</div>, position: { x: 5496.8135, y: 3692.2812 } },
  { label: <div>Krakau</div>, position: { x: 4689.9424, y: 4396.5518 } },
  { label: <div>Kreta</div>, position: { x: 4500.6836, y: 3170.6968 } },
  { label: <div>Krim</div>, position: { x: 4079.8594, y: 4195.8457 } },
  { label: <div>La Rochelle</div>, position: { x: 5882.1699, y: 3876.6553 } },
  { label: <div>Leipzig</div>, position: { x: 4997.8035, y: 4443.6387 } },
  { label: <div>London</div>, position: { x: 5843.7969, y: 4227.8027 } },
  { label: <div>Lübeck</div>, position: { x: 5337.1074, y: 4620.5957 } },
  { label: <div>Lyon</div>, position: { x: 5586.1006, y: 4084.6162 } },
  { label: <div>Magdeburg</div>, position: { x: 5178.8955, y: 4465.6445 } },
  { label: <div>Maghreb</div>, position: { x: 4382.5186, y: 2602.4224 } },
  { label: <div>Mailand</div>, position: { x: 5432.0771, y: 4025.5039 } },
  { label: <div>Mainz</div>, position: { x: 5391.8633, y: 4343.9365 } },
  { label: <div>Mallorca</div>, position: { x: 5766.8096, y: 3371.2622 } },
  { label: <div>Mauretanien</div>, position: { x: 5541.4912, y: 2906.4775 } },
  { label: <div>Mekka,  wo <br/>Mohammed<br/>  begraben ist</div>, position: { x: 3224.8833, y: 2413.3081 } },
  { label: <div>Messene</div>, position: { x: 4796.8691, y: 3418.3672 } },
  { label: <div>Mondberge</div>, position: { x: 3474.3081, y: 1420.4668 } },
  { label: <div>Montpellier</div>, position: { x: 5749.9062, y: 3797.7773 } },
  { label: <div>Nach Ptolemäus ist <br/> die Erde über 180° von <br/> Süden bis Norden bewohnt</div>, position: { x: 3781.8389, y: 1025.4258 } },
  { label: <div>Nantes</div>, position: { x: 5987.2646, y: 4018.416 } },
  { label: <div>Neapel</div>, position: { x: 5070.168, y: 3698.3086 } },
  { label: <div>Nieder-Äthiopien</div>, position: { x: 2690.5815, y: 3022.7314 } },
  { label: <div>Nil</div>, position: { x: 3538.0581, y: 1713.098 } },
  { label: <div>Nördlicher Ozean,<br/>  größtenteils unbewohnbar</div>, position: { x: 2473.5986, y: 5416.2012 } },
  { label: <div>Norwegen</div>, position: { x: 4908.2275, y: 5342.8076 } },
  { label: <div>Nowgorod</div>, position: { x: 4054.1504, y: 5196.2197 } },
  { label: <div>Nubien</div>, position: { x: 4639.81, y: 2181.61 } },
  { label: <div>Nürnberg</div>, position: { x: 5143.0439, y: 4384.5244 } },
  { label: <div>Ober-Ägypten</div>, position: { x: 4064.6025, y: 2513.022 } },
  { label: <div>Oberes Libyen</div>, position: { x: 5567.0195, y: 2250.5972 } },
  { label: <div>Ofen</div>, position: { x: 4771.0117, y: 4181.1475 } },
  { label: <div>Olbia</div>, position: { x: 4220.0977, y: 4408.0859 } },
  { label: <div>Orakel des Ammon</div>, position: { x: 4321.2109, y: 2213.6357 } },
  { label: <div>Orsena</div>, position: { x: 3943.5225, y: 3710.1494 } },
  { label: <div>Österreich</div>, position: { x: 4932.1934, y: 4236.793 } },
  { label: <div>Ozeanisches Randgebirge</div>, position: { x: 4193.7393, y: 5700.0928 } },
  { label: <div>Padua</div>, position: { x: 5271.96, y: 4035.7529 } },
  { label: <div>Palermo</div>, position: { x: 4919.1719, y: 3351.0508 } },
  { label: <div>Paris</div>, position: { x: 5581.0732, y: 4262.3506 } },
  { label: <div>Partas</div>, position: { x: 4611.8125, y: 3490.7432 } },
  { label: <div>Passau</div>, position: { x: 4933.4043, y: 4330.0176 } },
  { label: <div>Phasis</div>, position: { x: 3349.1802, y: 3656.7852 } },
  { label: <div>Philippi</div>, position: { x: 4729.2773, y: 3935.9531 } },
  { label: <div>Pommern</div>, position: { x: 4796.752, y: 4504.9824 } },
  { label: <div>Portugal</div>, position: { x: 5971.4922, y: 3579.1807 } },
  { label: <div>Prag</div>, position: { x: 4893.4307, y: 4424.375 } },
  { label: <div>Preußen</div>, position: { x: 4648.0684, y: 4587.4395 } },
  { label: <div>Pruth</div>, position: { x: 4603.9111, y: 4225.4082 } },
  { label: <div>Quinsai</div>, position: { x: 3188.7852, y: 4311.9893 } },
  { label: <div>Ragnit</div>, position: { x: 4571.1631, y: 4545.166 } },
  { label: <div>Regensburg</div>, position: { x: 5127.1533, y: 4262.6982 } },
  { label: <div>Reich der Elamiten</div>, position: { x: 2699.5151, y: 3114.2373 } },
  { label: <div>Reich der Tataren</div>, position: { x: 3791.8359, y: 4622.5488 } },
  { label: <div>Rhodos</div>, position: { x: 4125.7178, y: 3332.3228 } },
  { label: <div>Riga</div>, position: { x: 4184.3047, y: 4627.4043 } },
  { label: <div>Rom</div>, position: { x: 5144.0781, y: 3737.9707 } },
  { label: <div style={{fontSize: "50px"}}>Rotes Meer</div>, position: { x: 3513.4893, y: 2243.877 } },
  { label: <div>Saba</div>, position: { x: 2629.6128, y: 3361.3457 } },
  { label: <div>Chaldäa</div>, position: { x: 2850.6128, y: 3361.3457 } },
  { label: <div>Salzburg</div>, position: { x: 5146.2773, y: 4204.5029 } },
  { label: <div>Samarkand</div>, position: { x: 3048.7573, y: 4825.667 } },
  { label: <div>Sardinien</div>, position: { x: 5484.5156, y: 3484.9463 } },
  { label: <div>Säulen des Herkules</div>, position: { x: 6204.2725, y: 3129.3394 } },
  { label: <div>Schottland</div>, position: { x: 5731.9277, y: 4421.1191 } },
  { label: <div>Sechstes, <br/> konstantinopolisches <br/> Klima</div>, position: { x: 6544.5068, y: 3935.6699 } },
  { label: <div>See von Meroe</div>, position: { x: 3857.1387, y: 2063.4834 } },
  { label: <div>See</div>, position: { x: 3519.2334, y: 3479.8047 } },
  { label: <div>Sera</div>, position: { x: 1920.6383, y: 3597.1497 } },
  { label: <div>Sevilla</div>, position: { x: 5948.1816, y: 3397.2544 } },
  { label: <div>Siebtes, englisches Klima, <br/> Grenze der Donau</div>, position: { x: 6386.3232, y: 4305.3184 } },
  { label: <div>Silberinsel</div>, position: { x: 2583.2046, y: 2630.7026 } },
  { label: <div>Skyten</div>, position: { x: 3033.8931, y: 5124.4453 } },
  { label: <div>Sochumi</div>, position: { x: 3545.6807, y: 4208.8018 } },
  { label: <div>Sonnen und<br/> Mondbäume</div>, position: { x: 1572.6567, y: 2783.8193 } },
  { label: <div>Spanien</div>, position: { x: 5875.8662, y: 3450.8438 } },
  { label: <div>Sparta</div>, position: { x: 4459.4434, y: 3380.9844 } },
  { label: <div>Speyer</div>, position: { x: 5415.1572, y: 4278.4609 } },
  { label: <div>Split</div>, position: { x: 4990.3096, y: 3902.8301 } },
  { label: <div>Stettin</div>, position: { x: 4943.1055, y: 4518.4297 } },
  { label: <div>Stockholm</div>, position: { x: 5225.1592, y: 4885.2148 } },
  { label: <div>Straßburg</div>, position: { x: 5417.7441, y: 4229.8018 } },
  { label: <div>Syrakus</div>, position: { x: 5205.1982, y: 3373.2822 } },
  { label: <div>Tal der <br/> Finsternis</div>, position: { x: 1369.79, y: 3859.7842 } },
  { label: <div >Tananisches Meer</div>, position: { x: 3781.2412, y: 4348.7041 } },
  { label: <div>Taprobane</div>, position: { x: 2185.0146, y: 2454.1582 } },
  { label: <div>Tenedos</div>, position: { x: 4384.8203, y: 3587.6733 } },
  { label: <div>Tigris</div>, position: { x: 1512.2894, y: 3800.1494 } },
  { label: <div>Tortosa</div>, position: { x: 5698.7402, y: 3591.7461 } },
  { label: <div >Totes Meer</div>, position: { x: 3486.9897, y: 2914.1362 } },
  { label: <div>Toulouse</div>, position: { x: 5698.6592, y: 3999.3086 } },
  { label: <div>Triest</div>, position: { x: 4958.708, y: 4095.5068 } },
  { label: <div>Triest</div>, position: { x: 4958.708, y: 4095.5068 } },
  { label: <div>Tripolis</div>, position: { x: 4957.6787, y: 2865.9844 } },
  { label: <div>Troja</div>, position: { x: 4160.1045, y: 3616.8457 } },
  { label: <div>Trondheim</div>, position: { x: 5232.8418, y: 5138.0537 } },
  { label: <div>Tunis</div>, position: { x: 5345.457, y: 3169.8091 } },
  { label: <div>Türkei</div>, position: { x: 3811.999, y: 3785.1357 } },
  { label: <div>Turm von <br/>Babylon</div>, position: { x: 2924.1099, y: 3227.1587 } },
  { label: <div>Ulm</div>, position: { x: 5287.4121, y: 4335.7393 } },
  { label: <div style={{fontSize: "50px"}}>Unbefahrbares <br/> ozeanisches Meer</div>, position: { x: 2563.0854, y: 5906.0361 } },
  { label: <div>Ungarn</div>, position: { x: 4760.8789, y: 4276.5088 } },
  { label: <div>Uppsala</div>, position: { x: 5148.4844, y: 4952.1514 } },
  { label: <div>Utrecht</div>, position: { x: 5572.7061, y: 4490.7539 } },
  { label: <div>Venedig</div>, position: { x: 5085.9307, y: 4033.665 } },
  { label: <div>Verlassenes Libyen</div>, position: { x: 5600.8027, y: 1934.6548 } },
  { label: <div>Viertes Klima, Azoren</div>, position: { x: 6567.4824, y: 3464.9326 } },
  { label: <div>Viterbo</div>, position: { x: 5113.6279, y: 3826.7295 } },
  { label: <div>Viterbo</div>, position: { x: 5113.6279, y: 3826.7295 } },
  { label: <div style={{fontSize: "45px"}}>Westliches<br/> Meer</div>, position: { x: 1830.8857, y: 4709.0352 } },
  { label: <div>Wien</div>, position: { x: 4946.5576, y: 4272.9062 } },
  { label: <div>Wo das Paradies ist</div>, position: { x: 2031.7139, y: 2696.5864 } },
  { label: <div>York</div>, position: { x: 5803.668, y: 4384.5234 } },
  { label: <div>Zagreb</div>, position: { x: 4989.5645, y: 4134.5391 } },
  { label: <div>Zagreb</div>, position: { x: 4989.5645, y: 4134.5391 } },
  { label: <div>Zumbaria</div>, position: { x: 2963.21, y: 1771.6841 } },
  { label: <div>Zweites, <br/> alexandrisches Klima</div>, position: { x: 6383.873, y: 2691.1025 } },
  { label: <div>Zypern</div>, position: { x: 3913.1172, y: 3303.3428 } },
]

export const mapPoints =  [
  { label: "1", position: { x: 4239.1699, y: 5157.5161 } },
  { label: "2", position: { x: 4237.1743, y: 3590.8804 } },
  { label: "3", position: { x: 4010.6938, y: 3441.5288 } },
  { label: "4", position: { x: 3972.353, y: 3602.9177 } },
  { label: "5", position: { x: 3867.5833, y: 3589.5049 } },
  { label: "6", position: { x: 3912.6121, y: 3699.7747 } },
  { label: "7", position: { x: 3766.7124, y: 3649.6917 } },
  { label: "8", position: { x: 3798.2834, y: 3473.6577 } },
  { label: "9", position: { x: 3730.8496, y: 3878.4688 } },
  { label: "10", position: { x: 4116.4902, y: 3850.8279 } },
  { label: "11", position: { x: 3680.2029, y: 4199.2886 } },
  { label: "12", position: { x: 3297.2378, y: 4277.7544 } },
  { label: "13", position: { x: 3021.0059, y: 4815.7559 } },
  { label: "14", position: { x: 2569.563, y: 4013.7092 } },
  { label: "15", position: { x: 2507.6904, y: 3729.4985 } },
  { label: "16", position: { x: 2605.3706, y: 3348.7532 } },
  { label: "17", position: { x: 2762.2366, y: 3438.1123 } },
  { label: "18", position: { x: 2858.7234, y: 3604.2573 } },
  { label: "19", position: { x: 2640.824, y: 3215.7253 } },
  { label: "20", position: { x: 2670.9172, y: 3104.2263 } },
  { label: "21", position: { x: 2762.5347, y: 2981.1782 } },
  { label: "22", position: { x: 2976.5315, y: 2947.1704 } },
  { label: "23", position: { x: 1992.2406, y: 2699.7339 } },
  { label: "24", position: { x: 2036.9879, y: 1816.2969 } },
  { label: "25", position: { x: 2263.6931, y: 1957.2419 } },
  { label: "26", position: { x: 2374.6262, y: 1756.9135 } },
  { label: "27", position: { x: 3394.5657, y: 1669.8221 } },
  { label: "28", position: { x: 3626.4812, y: 1789.5266 } },
  { label: "29", position: { x: 3801.0222, y: 1854.9208 } },
  { label: "30", position: { x: 3585.0969, y: 2049.9116 } },
  { label: "31", position: { x: 3969.9832, y: 2355.8489 } },
  { label: "32", position: { x: 4001.4695, y: 2310.5273 } },
  { label: "33", position: { x: 4050.8708, y: 2263.2744 } },
  { label: "34", position: { x: 4092.074, y: 2188.6768 } },
  { label: "35", position: { x: 4122.8467, y: 2145.98 } },
  { label: "36", position: { x: 4181.187, y: 2050.3447 } },
  { label: "37", position: { x: 4459.582, y: 2162.4761 } },
  { label: "38", position: { x: 4342.3296, y: 2329.5991 } },
  { label: "39", position: { x: 4514.1958, y: 2520.9597 } },
  { label: "40", position: { x: 4779.0312, y: 2211.0442 } },
  { label: "41", position: { x: 4866.5283, y: 2376.3909 } },
  { label: "42", position: { x: 4930.2183, y: 2372.9104 } },
  { label: "43", position: { x: 5097.3516, y: 2382.9207 } },
  { label: "44", position: { x: 5260.0786, y: 2276.0999 } },
  { label: "45", position: { x: 5266.936, y: 2200.9302 } },
  { label: "46", position: { x: 4767.7212, y: 2302.8643 } },
  { label: "47", position: { x: 5966.8843, y: 2304.3628 } },
  { label: "48", position: { x: 5647.6724, y: 2648.0955 } },
  { label: "49", position: { x: 5654.5303, y: 2693.5696 } },
  { label: "50", position: { x: 5695.9922, y: 2724.7778 } },
  { label: "51", position: { x: 5962.0537, y: 2911.4741 } },
  { label: "52", position: { x: 5914.9229, y: 2883.4565 } },
  { label: "53", position: { x: 5908.0654, y: 2723.4019 } },
  { label: "54", position: { x: 5875.1172, y: 2925.3738 } },
  { label: "55", position: { x: 5502.3506, y: 2862.3281 } },
  { label: "56", position: { x: 5523.7529, y: 3128.821 } },
  { label: "57", position: { x: 5360.5244, y: 3246.6423 } },
  { label: "58", position: { x: 5416.5063, y: 3189.1836 } },
  { label: "59", position: { x: 5660.2095, y: 3202.9636 } },
  { label: "60", position: { x: 5724.6157, y: 3192.4675 } },
  { label: "61", position: { x: 5766.5234, y: 3251.7629 } },
  { label: "62", position: { x: 5938.1675, y: 3193.1174 } },
  { label: "63", position: { x: 6020.1992, y: 3258.897 } },
  { label: "64", position: { x: 5155.2949, y: 3002.1184 } },
  { label: "65", position: { x: 5215.4434, y: 2814.4255 } },
  { label: "66", position: { x: 4939.0693, y: 2865.8955 } },
  { label: "67", position: { x: 4927.4341, y: 2993.4248 } },
  { label: "68", position: { x: 4971.125, y: 2947.1704 } },
  { label: "69", position: { x: 4614.7544, y: 2776.4185 } },
  { label: "70", position: { x: 4611.7891, y: 2827.6902 } },
  { label: "71", position: { x: 3761.3088, y: 3312.6145 } },
  { label: "72", position: { x: 3756.6455, y: 3259.7615 } },
  { label: "73", position: { x: 3852.167, y: 2913.3848 } },
  { label: "74", position: { x: 3843.4846, y: 2999.9395 } },
  { label: "75", position: { x: 3916.8252, y: 2884.48 } },
  { label: "76", position: { x: 4296.2847, y: 2856.4062 } },
  { label: "77", position: { x: 3691.4854, y: 3269.2991 } },
  { label: "78", position: { x: 3724.2771, y: 4754.0479 } },
  { label: "79", position: { x: 4239.1699, y: 5157.5161 } },
  { label: "80", position: { x: 3972.353, y: 3602.9177 } },
  { label: "81", position: { x: 3867.5833, y: 3589.5049 } },
  { label: "82", position: { x: 3730.8496, y: 3878.4688 } },
  { label: "83", position: { x: 4116.4902, y: 3850.8279 } },
  { label: "84", position: { x: 3459.8025, y: 4111.6055 } },
  { label: "85", position: { x: 3297.2378, y: 4277.7544 } },
  { label: "86", position: { x: 2959.1731, y: 4579.0947 } },
  { label: "87", position: { x: 3021.0059, y: 4815.7559 } },
  { label: "88", position: { x: 2640.824, y: 3215.7253 } },
  { label: "89", position: { x: 2670.9172, y: 3104.2263 } },
  { label: "90", position: { x: 2762.5347, y: 2981.1782 } },
  { label: "91", position: { x: 2976.5315, y: 2947.1704 } },
  { label: "92", position: { x: 3124.9866, y: 2631.4084 } },
  { label: "93", position: { x: 1992.2406, y: 2699.7339 } },
  { label: "94", position: { x: 2374.6262, y: 1756.9135 } },
  { label: "95", position: { x: 3394.5657, y: 1669.8221 } },
  { label: "96", position: { x: 5097.3516, y: 2382.9207 } },
  { label: "97", position: { x: 5260.0786, y: 2276.0999 } },
  { label: "98", position: { x: 5266.936, y: 2200.9302 } },
  { label: "99", position: { x: 5966.8843, y: 2304.3628 } },
  { label: "100", position: { x: 5647.6724, y: 2648.0955 } },
  { label: "101", position: { x: 5654.5303, y: 2693.5696 } },
  { label: "102", position: { x: 5695.9922, y: 2724.7778 } },
  { label: "103", position: { x: 5962.0537, y: 2911.4741 } },
  { label: "104", position: { x: 5914.9229, y: 2883.4565 } },
  { label: "105", position: { x: 5908.0654, y: 2723.4019 } },
  { label: "106", position: { x: 5875.1172, y: 2925.3738 } },
  { label: "107", position: { x: 5502.3506, y: 2862.3281 } },
  { label: "108", position: { x: 5523.7529, y: 3128.821 } },
  { label: "109", position: { x: 5360.5244, y: 3246.6423 } },
  { label: "110", position: { x: 5416.5063, y: 3189.1836 } },
  { label: "111", position: { x: 5660.2095, y: 3202.9636 } },
  { label: "112", position: { x: 5724.6157, y: 3192.4675 } },
  { label: "113", position: { x: 5766.5234, y: 3251.7629 } },
  { label: "114", position: { x: 5938.1675, y: 3193.1174 } },
  { label: "115", position: { x: 6020.1992, y: 3258.897 } },
  { label: "116", position: { x: 5155.2949, y: 3002.1184 } },
  { label: "117", position: { x: 5215.4434, y: 2814.4255 } },
  { label: "118", position: { x: 4939.0693, y: 2865.8955 } },
  { label: "119", position: { x: 4927.4341, y: 2993.4248 } },
  { label: "120", position: { x: 4971.125, y: 2947.1704 } },
  { label: "121", position: { x: 3758.5955, y: 3142.6604 } },
  { label: "122", position: { x: 3998.8347, y: 2997.9309 } },
  { label: "123", position: { x: 3645.1045, y: 3428.7251 } },
  { label: "124", position: { x: 3407.3879, y: 3293.1838 } },
  { label: "125", position: { x: 3164.3606, y: 3384.1021 } },
  { label: "126", position: { x: 3069.312, y: 3261.2029 } }
];

export const mapPoints2 = [
  { label: "1", position: { x: 4972.3018, y: 4004.3499 } },
  { label: "2", position: { x: 5045.7461, y: 4070.4233 } },
  { label: "3", position: { x: 5173.5854, y: 4085.5637 } },
  { label: "4", position: { x: 5185.8379, y: 4007.4116 } },
  { label: "5", position: { x: 5255.2656, y: 4009.7886 } },
  { label: "6", position: { x: 5010.5361, y: 3932.8191 } },
  { label: "7", position: { x: 5289.689, y: 3916.1196 } },
  { label: "8", position: { x: 5221.9839, y: 3864.1428 } },
  { label: "9", position: { x: 5228.2227, y: 3801.2258 } },
  { label: "10", position: { x: 5225.8345, y: 3729.4985 } },
  { label: "11", position: { x: 5182.252, y: 3690.5562 } },
  { label: "12", position: { x: 5392.4995, y: 4010.6172 } },
  { label: "13", position: { x: 5424.5381, y: 3935.5859 } },
  { label: "14", position: { x: 5217.4673, y: 4170.311 } },
  { label: "15", position: { x: 5362.1997, y: 4143.5571 } },
  { label: "16", position: { x: 5131.5669, y: 4211.4497 } },
  { label: "17", position: { x: 5036.6333, y: 4169.2373 } },
  { label: "18", position: { x: 4960.1152, y: 4191.7119 } },
  { label: "19", position: { x: 4926.8218, y: 4265.4209 } },
  { label: "20", position: { x: 5074.5562, y: 4302.6245 } },
  { label: "21", position: { x: 5157.7461, y: 4287.4561 } },
  { label: "22", position: { x: 4797.9243, y: 4201.0151 } },
  { label: "23", position: { x: 4744.0029, y: 4128.0103 } },
  { label: "24", position: { x: 4662.4277, y: 4195.7119 } },
  { label: "25", position: { x: 4522.8149, y: 4142.4858 } },
  { label: "26", position: { x: 4443.8823, y: 4182.3662 } },
  { label: "27", position: { x: 4490.9102, y: 4222.5293 } },
  { label: "28", position: { x: 4310.9541, y: 4397.4653 } },
  { label: "29", position: { x: 4305.9336, y: 4477.751 } },
  { label: "30", position: { x: 3701.9729, y: 4456.8018 } },
  { label: "31", position: { x: 4020.0508, y: 4088.76 } },
  { label: "32", position: { x: 4544.8984, y: 4535.2051 } },
  { label: "33", position: { x: 4728.8511, y: 4414.4639 } },
  { label: "34", position: { x: 4875.1714, y: 4415.1895 } },
  { label: "35", position: { x: 4992.3682, y: 4388.0444 } },
  { label: "36", position: { x: 5049.353, y: 4466.3628 } },
  { label: "37", position: { x: 5116.7886, y: 4394.0425 } },
  { label: "38", position: { x: 5200.8613, y: 4344.9731 } },
  { label: "39", position: { x: 5215.437, y: 4421.5039 } },
  { label: "40", position: { x: 5153.7104, y: 4457.0044 } },
  { label: "41", position: { x: 5223.5591, y: 4500.0269 } },
  { label: "42", position: { x: 5066.6777, y: 4530.7554 } },
  { label: "43", position: { x: 5209.1274, y: 4856.9131 } },
  { label: "44", position: { x: 5133.6772, y: 4917.2944 } },
  { label: "45", position: { x: 5273.2456, y: 5096.8462 } },
  { label: "46", position: { x: 5759.4424, y: 4839.1782 } },
  { label: "47", position: { x: 4759.6099, y: 5197.063 } },
  { label: "48", position: { x: 5322.4258, y: 4354.8276 } },
  { label: "49", position: { x: 5283.0674, y: 4264.9204 } },
  { label: "50", position: { x: 5396.8384, y: 4220.9609 } },
  { label: "51", position: { x: 5613.9863, y: 4219.3354 } },
  { label: "52", position: { x: 5690.0737, y: 4219.5381 } },
  { label: "53", position: { x: 5718.5088, y: 4166.9204 } },
  { label: "54", position: { x: 5823.0923, y: 4212.6055 } },
  { label: "55", position: { x: 5827.9307, y: 4167.1641 } },
  { label: "56", position: { x: 5679.7627, y: 3999.2029 } },
  { label: "57", position: { x: 5866.9219, y: 3903.418 } },
  { label: "58", position: { x: 5952.5635, y: 4003.1245 } },
  { label: "59", position: { x: 6234.5674, y: 3896.6453 } },
  { label: "60", position: { x: 5731.3022, y: 3808.7239 } },
  { label: "61", position: { x: 5620.6685, y: 3898.5144 } },
  { label: "62", position: { x: 5733.9258, y: 3727.3047 } },
  { label: "63", position: { x: 5785.4175, y: 3654.7507 } },
  { label: "64", position: { x: 5821.3735, y: 3586.1289 } },
  { label: "65", position: { x: 6021.0337, y: 3690.8005 } },
  { label: "66", position: { x: 6129.1064, y: 3713.6294 } },
  { label: "67", position: { x: 6067.4155, y: 3626.3621 } },
  { label: "68", position: { x: 5938.4448, y: 3542.697 } },
  { label: "69", position: { x: 6114.7739, y: 3464.8445 } },
  { label: "70", position: { x: 5938.4448, y: 3365.073 } },
  { label: "71", position: { x: 5762.9058, y: 3489.2095 } },
  { label: "72", position: { x: 6071.1279, y: 3368.3809 } },
  { label: "73", position: { x: 6097.4287, y: 3420.2341 } },
  { label: "74", position: { x: 6329.5703, y: 3428.8433 } },
  { label: "75", position: { x: 5715.7051, y: 3374.4319 } },
  { label: "76", position: { x: 5662.1855, y: 3473.1729 } },
  { label: "77", position: { x: 5782.5674, y: 4354.877 } },
  { label: "78", position: { x: 6018.6094, y: 4498.6567 } },
  { label: "79", position: { x: 6047.9375, y: 4299.2939 } },
  { label: "80", position: { x: 5631.667, y: 4297.0903 } },
  { label: "81", position: { x: 5466.7686, y: 4371.2769 } },
  { label: "82", position: { x: 5371.6431, y: 4340.9097 } },
  { label: "83", position: { x: 5426.501, y: 4399.436 } },
  { label: "84", position: { x: 5471.1069, y: 4430.8628 } },
  { label: "85", position: { x: 5551.3647, y: 4403.7759 } },
  { label: "86", position: { x: 5560.7236, y: 4449.9233 } },
  { label: "87", position: { x: 5391.7812, y: 4514.2559 } },
  { label: "88", position: { x: 5338.4302, y: 4547.4692 } },
  { label: "89", position: { x: 5322.3115, y: 4637.5649 } },
  { label: "90", position: { x: 5313.6353, y: 4685.4238 } },
  { label: "91", position: { x: 5396.6484, y: 4269.6489 } },
  { label: "92", position: { x: 5311.3521, y: 4215.1191 } },
  { label: "93", position: { x: 5522.1694, y: 4090.3933 } },
  { label: "94", position: { x: 5575.3838, y: 4119.9365 } },
  { label: "95", position: { x: 5668.4541, y: 4079.49 } },
  { label: "96", position: { x: 5620.6685, y: 4029.8181 } },
  { label: "97", position: { x: 4802.3433, y: 4525.3774 } },
  { label: "98", position: { x: 4829.1133, y: 4599.4424 } },
  { label: "99", position: { x: 4594.4531, y: 4606.0713 } },
  { label: "100", position: { x: 4426.8647, y: 4636.6768 } },
  { label: "101", position: { x: 4673.1851, y: 4082.5801 } },
  { label: "102", position: { x: 4623.7065, y: 4082.5801 } },
  { label: "103", position: { x: 4529.668, y: 4077.5325 } },
  { label: "104", position: { x: 4436.6567, y: 3999.2546 } },
  { label: "105", position: { x: 4708.5762, y: 3924.4084 } },
  { label: "106", position: { x: 4846.7661, y: 3875.7495 } },
  { label: "107", position: { x: 4846.7661, y: 3813.9463 } },
  { label: "108", position: { x: 4354.0913, y: 3559.825 } },
  { label: "109", position: { x: 4374.7695, y: 3807.0525 } },
  { label: "110", position: { x: 4700.5913, y: 3737.2708 } },
  { label: "111", position: { x: 4919.3086, y: 3573.6987 } },
  { label: "112", position: { x: 4853.7363, y: 3721.0935 } },
  { label: "113", position: { x: 4762.2808, y: 3406.1633 } },
  { label: "114", position: { x: 4720.5396, y: 3481.2913 } },
  { label: "115", position: { x: 4567.3774, y: 3432.3677 } },
  { label: "116", position: { x: 4588.1992, y: 3387.1177 } },
  { label: "117", position: { x: 4249.7979, y: 3301.1499 } },
  { label: "118", position: { x: 4088.709, y: 3256.719 } },
  { label: "119", position: { x: 1557.25, y: 4257.3755 } },
  { label: "120", position: { x: 1416.2059, y: 4133.0103 } },
  { label: "121", position: { x: 1377.3862, y: 4025.0178 } },
  { label: "122", position: { x: 1547.8912, y: 3985.2656 } },
  { label: "123", position: { x: 1606.8901, y: 4421.2842 } },
  { label: "124", position: { x: 1620.9232, y: 4467.3804 } },
  { label: "125", position: { x: 1642.3403, y: 4522.2642 } },
  { label: "126", position: { x: 1857.6711, y: 4184.4033 } },
  { label: "127", position: { x: 1712.9215, y: 4135.7358 } },
  { label: "128", position: { x: 1896.7758, y: 3574.0146 } },
  { label: "129", position: { x: 2085.4824, y: 3555.6746 } },
  { label: "130", position: { x: 2211.821, y: 3639.9153 } },
  { label: "131", position: { x: 2007.8126, y: 4157.5674 } },
  { label: "132", position: { x: 2037.3832, y: 4382.1558 } },
  { label: "133", position: { x: 2170.1367, y: 4263.0093 } },
  { label: "134", position: { x: 2159.8191, y: 4100.1094 } },
  { label: "135", position: { x: 2341.6479, y: 4087.8899 } },
  { label: "136", position: { x: 4342.6606, y: 5171.9907 } },
  { label: "137", position: { x: 2252.9136, y: 2383.1917 } },
  { label: "138", position: { x: 5078.0361, y: 3354.2239 } },
  { label: "139", position: { x: 5304.9468, y: 3336.886 } }
];