import classes from "./Footer.module.css"
import GithubIcon  from "../../assets/GithubIcon.png";
import LinkedlnIcon from "../../assets/LinkedlnIcon.png";
const Footer = () => {
    return(
        <div className={classes.footerContainer}>
            <a href="https://github.com/DaviAntonioMendesGaiga" target="_blank" rel="external"><img src={GithubIcon} alt="Ícone do Github"/></a>
            <a href="https://www.linkedin.com/in/davi-ant%C3%B4nio-902104301/" target="_blank" rel="external"><img src={LinkedlnIcon} alt="Ícone do Linkedln"/></a>
        </div>
    )
}

export default Footer