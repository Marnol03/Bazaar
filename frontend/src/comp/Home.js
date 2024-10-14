import './Home.css';
  
  import ecommerce from "../images/ecommerce.jpg";
  import overmax from "../images/jogging overmax.jpeg";
 

  function App() {
    return (
      <>
        <Entete/>
        <Barrecherche/>
        <Photo/>
        <Article/>
      </>  
    );
    }
    const Entete = () => {
      return (
        <div>
        <div className="nav" >
          <a href='#' className='lien'>
            <div className='camion'>
              Livraison
            </div>
          </a>
          <div className='trait' ></div>
          <a href='#' >
            <div className='telecharger'>
              Telecharger  
            </div>
            <div className='baazar-app'>
              Baazar-app  
            </div>
          </a>
        </div>
      </div>

    
      );
    }
    const Barrecherche = () => {
      return (
        <div>
             <div className='barrecherche'>  
            <div className='logo' >
                {/* logo baazar */}
            </div>
            <div  >
                <input type='text' placeholder='Recherche' className='recherche'/>
            </div>
            <div className='connexion' >
                {/* logo panier */}
                {/* logo connexion */}
                Connexion
                s'inscrire
            </div>
        </div>
        <div className='barcategorie' >
              <ul>
                <li>  
                  Categorie : 
                          <select className='' >  
                            <option> Chaussure </option> 
                            <option> Habits </option> 
                            <option> Accesoir </option>
                          </select>
                </li>
                <li> <a href='#'> Nouveautes</a></li>
                <li> <a href='#'> Offres </a></li>
                <li> <a href='#'> Tout </a></li>
                <li> <a href='#'> Aide </a></li>
                
              </ul>
                
            </div>

        </div>
       
      );
    }
    const Photo = () => {
      return (
        <div className='photo'>  
            <div className='logo' >
              <img src={ecommerce} className="imgcommerce" alt="logo" />
            </div>
        </div>
      );
    }
    const Article = () => {
      return (
        <div className='container' >
            <div className='article'> 
          <h4  >  Au top.... </h4>
            <ul>
                <li> 
                    <div className='bloc-article' >
                        <div className='bloc-images'>  <img src={overmax} className="imgcommerce" alt="logo" /> </div>
                        <p className='nom-article' > jogging </p>
                        <p className='prix-article' > 5425 <span className='fcfa'>  FCFA</span> </p>
                        <p className='note-article' >  4.1</p>
                    </div>
                </li>
              
                
            </ul>
          </div>
        </div>
          
      );
    }



export default App;
/* Rectangle 15 */

