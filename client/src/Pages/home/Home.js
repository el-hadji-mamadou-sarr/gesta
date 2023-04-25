import { Grid, ListItem } from "@mui/material";
import ResponsiveAppBar from "../layout/home/ResponsiveAppBar";
import homeHero from "./../../Assets/images/home-hero.svg";


export default function Home() {
  return (<>
    <ResponsiveAppBar />
    <Grid container spacing={6} sx={{ display: 'flex' }}>
      <Grid item xs={6}>
        colonne 1
      </Grid>
      <Grid item xs={6}>
        <img src={homeHero} alt="" style={{ display: 'block', marginTop: '58px' }} />
      </Grid>
    </Grid>
  </>)
}