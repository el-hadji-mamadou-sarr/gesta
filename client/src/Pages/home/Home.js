import { Grid } from "@mui/material";
import ResponsiveAppBar from "../layout/home/ResponsiveAppBar";
import homeHero from "./../../Assets/images/home-hero.svg";


export default function Home() {
  return (<>
    <ResponsiveAppBar />
    <Grid container spacing={6} sx={{ display: 'flex' }}>
      <Grid item xs={6}>
        <div className="p-24">
          <h2 className="text-3xl font-semibold ">
            Le centre de productivité extrème
          </h2>
          <p className="mt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos placeat nemo, voluptates eius cupiditate at consequatur animi quis quae minima libero soluta officiis quam rem, nam corporis quaerat. Commodi, est!
          </p>
          <h3 className="text-3xl font-semibold mt-8">
            Le centre de productivité extrème
          </h3>
          <p className="mt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos placeat nemo, voluptates eius cupiditate at consequatur animi quis quae minima libero soluta officiis quam rem, nam corporis quaerat. Commodi, est!
          </p>
        </div>
      </Grid>
      <Grid item xs={6}>
        <img src={homeHero} alt="" style={{ display: 'block', marginTop: '58px' }} />
      </Grid>
    </Grid>
  </>)
}