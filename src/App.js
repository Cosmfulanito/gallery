import React, { useEffect, useState } from 'react';

import './App.css';

import GalleryPainting from './components/GalleryPainting';
import PaintingPage from './components/PaintingPage';
import useTabletPaintings from './Hooks/useTabletPaintings';
import useDesktopPaintings from './Hooks/useDesktopPaintings';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';							// Esto es parte del "react router". O sea, sirve para cambiar de link 
										

function App() {
	const [paintings, setPaintings] = useState([
		{
			name: 'Starry Night',
			artistName: 'Vincent Van Gogh',
			year: '1889',
			info: `Although The Starry Night was painted during the day in Van Gogh's ground-floor studio, it would be inaccurate to state that the picture was painted from memory. The view has been identified as the one from his bedroom window, facing east, a view which Van Gogh painted variations of no fewer than twenty-one times, including The Starry Night. "Through the iron-barred window," he wrote to his brother, Theo, around 23 May 1889, "I can see an enclosed square of wheat ... above which, in the morning, I watch the sun rise in all its glory."`,
			source: 'https://en.wikipedia.org/wiki/The_Starry_Night',
		},
		{
			name: 'Girl with a Pearl Earring',
			artistName: 'Johannes Vermeer',
			year: '1665',
			info: `The painting is a tronie, the Dutch 17th-century description of a 'head' that was not meant to be a portrait. It depicts a European girl wearing an exotic dress, an oriental turban, and what was thought to be a very large pearl as an earring. In 2014, Dutch astrophysicist Vincent Icke raised doubts about the material of the earring and argued that it looks more like polished tin than pearl on the grounds of the specular reflection, the pear shape and the large size of the earring.`,
			source: 'https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring',
		},
		{
			name: 'Guernica',
			artistName: 'Pablo Picasso',
			year: '1937',
			info: `The scene occurs within a room where, on the left, a wide-eyed bull stands over a grieving woman holding a dead child in her arms. In the center of the room a horse falls in agony with a large gaping hole in its side, as if it had just been run through by a spear or javelin. The horse appears to be wearing chain mail armor, decorated with vertical tally marks arranged in rows. A dead and dismembered soldier lies under the horse. The hand of his severed right arm grasps a shattered sword, from which a flower grows.`,
			source: 'https://en.wikipedia.org/wiki/Guernica_(Picasso)',
		},
		{
			name: 'Penitent Magdalene',
			artistName: 'Artemisia Gentileschi',
			year: '1625',
			info: `Penitent Magdalene is a painting by the Italian artist Artemisia Gentileschi. It hangs in Seville Cathedral. It has probably been in the cathedral since the late 17th century. The painting's first home was the collection of Fernando Enriquez Afan de Ribera, from 1626 to 1637. She returned to the subject later in the 1620s in Mary Magdalene as Melancholy.`,
			source: 'https://en.wikipedia.org/wiki/Penitent_Magdalene_(Artemisia_Gentileschi)',
		},
		{
			name: 'The Storm on the Sea of Galilee',
			artistName: 'Rembrandt',
			year: '1633',
			info: `The painting, in vertical format, shows a close-up view of Christ's disciples struggling frantically against the heavy storm to regain control of their fishing boat. A huge wave beats the bow and rips the sail. One of the disciples is seen vomiting over the side. Another one, looking directly out at the viewer, is a self-portrait of the artist. Only Christ, depicted on the right, remains calm.`,
			source: 'https://en.wikipedia.org/wiki/The_Storm_on_the_Sea_of_Galilee',
		},
		{
			name: 'The Great Wave off Kanagawa',
			artistName: 'Hokusai',
			year: '1831',
			info: `The Great Wave off Kanagawa (Japanese: 神奈川沖浪裏, Hepburn: Kanagawa-oki Nami Ura, lit. "Under the Wave off Kanagawa"), also known as The Great Wave or simply The Wave, is a woodblock print by the Japanese ukiyo-e artist Hokusai. It was published sometime between 1829 and 1833 in the late Edo period as the first print in Hokusai's series Thirty-six Views of Mount Fuji. The image depicts an enormous wave threatening three boats off the coast in the Sagami Bay (Kanagawa Prefecture) while Mount Fuji rises in the background.`,
			source: 'https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa',
		},
		{
			name: 'Van Gogh Self-portrait',
			artistName: 'Vincent Van Gogh',
			year: '1889',
			info: `This self-portrait was one of about 32 produced over a 10-year period, and these were an important part of his work as a painter; he painted himself because he often lacked the money to pay for models. He took the painting with him to Auvers-sur-Oise, near Paris, where he showed it to Dr. Paul Gachet, who thought it was "absolutely fanatical". Art historians are divided as to whether this painting or Self-portrait without beard is Van Gogh's final self-portrait. The art historians Ingo F. Walther and Jan Hulsker consider this to be the last.`,
			source: 'https://en.wikipedia.org/wiki/Van_Gogh_self-portrait_(1889)',
		},
		{
			name: 'The Sleeping Gypsy',
			artistName: 'Henri Rousseau',
			year: '1897',
			info: `The Sleeping Gypsy (French: La Bohémienne endormie) is an 1897 oil painting by French Naïve artist Henri Rousseau (1844–1910). It is a fantastical depiction of a lion musing over a sleeping woman on a moonlit night. Rousseau first exhibited the painting at the 13th Salon des Indépendants, and tried unsuccessfully to sell it to the mayor of his hometown, Laval. Instead, it entered the private collection of a Parisian charcoal merchant where it remained until 1924, when it was discovered by the art critic Louis Vauxcelles.`,
			source: 'https://en.wikipedia.org/wiki/The_Sleeping_Gypsy',
		},
		{
			name: 'Lady with an Ermine',
			artistName: 'Leonardo da Vinci',
			year: '1489',
			info: `The Lady with an Ermine (Italian: Dama con l'ermellino [ˈdaːma kon lermelˈliːno]; Polish: Dama z gronostajem) is a portrait painting widely attributed to the Italian Renaissance artist Leonardo da Vinci. Dated to c. 1489–1491, the work is painted in oils on a panel of walnut wood. Its subject is Cecilia Gallerani, a mistress of Ludovico Sforza ("Il Moro"), Duke of Milan; Leonardo was painter to the Sforza court at the time of its execution. It is one of only four surviving portraits of women painted by Leonardo, the others being Ginevra de' Benci, La Belle Ferronnière and the Mona Lisa`,
			source: 'https://en.wikipedia.org/wiki/Lady_with_an_Ermine',
		},
		{
			name: 'The Night Café',
			artistName: 'Vincent Van Gogh',
			year: '1888',
			info: `The Night Café (French: Le Café de nuit) is an oil painting created by Dutch artist Vincent van Gogh in September 1888 in Arles. Its title is inscribed lower right beneath the signature. The painting is owned by Yale University and is currently held at the Yale University Art Gallery in New Haven, Connecticut. The interior depicted is the Café de la Gare, 30 Place Lamartine, run by Joseph-Michel Ginoux and his wife Marie, who in November 1888 posed for Van Gogh's and Gauguin's Arlésienne; a bit later, Joseph Ginoux evidently posed for both artists, too.`,
			source: 'https://en.wikipedia.org/wiki/The_Night_Caf%C3%A9',
		},
		{
			name: 'The Basket of Apples',
			artistName: 'Paul Cézanne',
			year: '1893',
			info: `The Basket of Apples (French: Le panier de pommes) is a still life oil painting by French artist Paul Cézanne, which he created c. 1893. The painting is particularly remarkable for its creative composition, which rejected realistic representation in favour of distorting objects to create multiple perspectives. This approach eventually influenced other art movements, including Fauvism and Cubism. It belongs to the Helen Birch Bartlett Memorial Collection of the Art Institute of Chicago.`,
			source: 'https://en.wikipedia.org/wiki/The_Basket_of_Apples',
		},
		{
			name: 'The Boy in the Red Vest',
			artistName: 'Paul Cézanne',
			year: '1889',
			info: `Cézanne painted four oil portraits of this Italian boy in the red vest, all in different poses, which allowed him to study the relationship between the figure and space. The most famous of the four, and the one commonly referred to by this title, is the one which depicts the boy in a melancholic seated pose with his elbow on a table and his head cradled in his hand. It is currently held in Zürich, Switzerland. The other three portraits, of different poses, are in museums in the US.`,
			source: 'https://en.wikipedia.org/wiki/The_Boy_in_the_Red_Vest',
		},
		{
			name: 'Arnolfini Portrait',
			artistName: 'Jan van Eyck',
			year: '1434',
			info: `It is considered one of the most original and complex paintings in Western art, because of its beauty, complex iconography, geometric orthogonal perspective, and expansion of the picture space with the use of a mirror. According to Ernst Gombrich "in its own way it was as new and revolutionary as Donatello's or Masaccio's work in Italy. A simple corner of the real world had suddenly been fixed on to a panel as if by magic ... For the first time in history the artist became the perfect eye-witness in the truest sense of the term".`,
			source: 'https://en.wikipedia.org/wiki/Arnolfini_Portrait',
		},
		{
			name: 'Mona Lisa',
			artistName: 'Leonardo da Vinci',
			year: '1503',
			info: `The Mona Lisa (/ˌmoʊnə ˈliːsə/; italian: La Gioconda [la dʒoˈkonda] or Monna Lisa [ˈmɔnna ˈliːza]) is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world". The painting's novel qualities include the subject's enigmatic expression, the monumentality of the composition, the subtle modelling of forms, and the atmospheric illusionism.`,
			source: 'https://en.wikipedia.org/wiki/Mona_Lisa',
		},
		{
			name: 'The Swing',
			artistName: 'Jean-Honoré Fragonard',
			year: '1767',
			info: `The painting depicts an elegant young woman on a swing. A smiling young man, hiding in the bushes on the left, watches her from a vantage point that allows him to see up into her billowing dress, where his arm is pointed with hat in hand. A smiling older man, who is nearly hidden in the shadows on the right, propels the swing with a pair of ropes. The older man appears to be unaware of the young man. As the young lady swings high, she throws her left leg up, allowing her dainty shoe to fly through the air.`,
			source: 'https://en.wikipedia.org/wiki/The_Swing_(Fragonard)',
		},
	])

	

	// Crear link: 									
	const subdirectory = (paintingName) => {															// Esto convierte el nombre de la pintura en una palabra que sirve como subdirectorio. Osea, en una subpagina propia  
		return paintingName.replace(/ /g, '_');															// Simplemente reemplazamos los espacios por un gion bajo 
	}



	// ______Efecto Masonry:_____																		// El efecto masonry es aquel que apila todas las imagenes aunque sean de diferente tamaño. Hay librerias que se encargan de hacer este efecto de forma automatica pero en mi caso no servian porque tengo que ordenar las imagenes de diferente orden segun esten en modo movil, tablet o desktop segun se me indico en la página front end mentor 
																										// Para el modo movil renderizaremos la lista de imagenes que esta en el useState "paintings".  
	const tablet = useTabletPaintings()																	// Para el modo tablet renderizaremos la lista de imagenes que esta en este useState.  
	const desktop = useDesktopPaintings()																// Para el modo desktop renderizaremos la lista de imagenes que esta en este useState. 

	const [viewportWidth, setViewportWidth] = useState('')												// Este useState me indica en que dispositivo ingreso el usuario a mi página. Este valor que es "nada" luego sera cambiado a "movil", "tablet" o "desktop" segun corresponda 										



	// Alternar dispositivo:
	const changeDevice = () => {																		// Esta función calcula el ancho de la pantalla y segun este cambia el valor del useState "viewportWidth" a "movil", "tablet" o "desktop" segun corresponda  
		if (window.innerWidth <= 479) {																	// La propiedad window.innerWidth calcula el ancho de mi pantalla en pixeles
			setViewportWidth('movil')																	

		} else if (window.innerWidth > 479 && window.innerWidth <= 778) {
			setViewportWidth('tablet')

		} else if (window.innerWidth > 778) {
			setViewportWidth('desktop')
		}
	}

	window.addEventListener('DOMContentLoaded', () => {													// El evento "DOMContentLoaded" se dispara cuando apenas se carga la página. Osea, cuando la abrimos.   // Básicamente apenas se abra la página, se calculara el ancho del dispositivo y de esta forma se claculara la cantidad de columnas de imagenes necesarias. De esta manera lograremos el efecto responsive
		changeDevice()
	})	

	window.addEventListener('resize', ()=> {															// El evento "resize" se dispara cuando el tramaño de la página cambia. // Básicamente cuando juguemos con el ancho de la pantalla, se calculara el ancho del dispositivo y de esta forma se claculara la cantidad de columnas de imagenes necesarias. De esta manera lograremos el efecto responsive 
		changeDevice()
	})
	
	const renderDispositive = () => {																	// Esta funcion se encarga retornar y renderizar las lista de imagenes correspondientes a su dispositivo
		if (viewportWidth === 'movil'){
			return(
				<div className='grid'>
					{paintings.map(painting => <GalleryPainting key={painting.name} painting={painting} subdirectory={subdirectory}/>)}				
				</div>
			)

		} else if (viewportWidth === 'tablet') {
			return(
				<div className='grid'>
					<div>																															{/* Recordar que en este caso (modo tablet) hay 2 columnas y que su respectiva lista estaba dividad en 2 listas más. Por eso tenemos 2 <div>, uno para cada columna. Lo mismo ocurre más abajo con el modo tablet pero en su caso hay 4 columnas */}
						{tablet[0].map(painting => <GalleryPainting key={painting.name} painting={painting} subdirectory={subdirectory}/>)}
					</div>
					<div>
						{tablet[1].map(painting => <GalleryPainting key={painting.name} painting={painting} subdirectory={subdirectory}/>)}
					</div>
				</div>
			)

		} else if (viewportWidth === 'desktop') {
			return(
				<div className='grid'>
					<div>
						{desktop[0].map(painting => <GalleryPainting key={painting.name} painting={painting} subdirectory={subdirectory}/>)}
					</div>
					<div>
						{desktop[1].map(painting => <GalleryPainting key={painting.name} painting={painting} subdirectory={subdirectory}/>)}
					</div>
					<div>
						{desktop[2].map(painting => <GalleryPainting key={painting.name} painting={painting} subdirectory={subdirectory}/>)}
					</div>
					<div>
						{desktop[3].map(painting => <GalleryPainting key={painting.name} painting={painting} subdirectory={subdirectory}/>)}
					</div>
				</div>
			)
		}
	}
	
	return (
		<div className="App">	
			<Router>
				<header className='header'>
					<img src={`./assets/images/mona-lisa/gallery.jpg`} alt={`perro`}></img>
					<div className='top-header'>
						<Link to="/gallery">
							<img src='./assets/shared/logo.svg' alt='title' className='title'></img>
						</Link>
						<Link to={`/gallery/${subdirectory(paintings[0].name)}`} className='slideshow'>START SLIDESHOW</Link>			{/* Este boton me redirige al link de la primera imagen */}
					</div>
					<div className='bar'></div>
				</header>
				<main>
					<Route exact path="/gallery/" render={() => {									
						return(
							<div className='gallery'>							
								{renderDispositive()}
							</div>
						)}}>										
					</Route>
					{paintings.map(painting => 
						<Route path={`/gallery/${subdirectory(painting.name)}`} key={painting.name}  render={() => {						// Este key es pára que no me tire errores 						
							return (
								<div>
									<img src={`./assets/images/mona-lisa/gallery.jpg`} alt={`perro`}></img>
									<PaintingPage paintings={paintings} painting={painting} subdirectory={subdirectory}/>
								</div>
							)}}>
						</Route>
					)}
				</main>
			</Router>
		</div>
	);
}

export default App;
