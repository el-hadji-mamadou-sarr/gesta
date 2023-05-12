import { useEffect, useState } from "react";
import MenuAppBar from "../../Component/navbar/dashboard/MenuAppBar";
import { Box, Button, ThemeProvider } from "@mui/material";
import { theme } from "../../Assets/theme/theme";



export default function Profile() {

  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/users/profile", { method: "GET", headers: {}, credentials: "include" })
      .then(response => { return response.json() }).then(data => {
        console.log(data);
        setUserInfos(data);
      })
  }, []);

  return <>
    <MenuAppBar />
    <div className="w-1/2 mx-auto">
      <div className="flex justify-center mt-16 border-3 p-4" style={{ background: userInfos.banner_color }}>
        <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
      </div>
      <div>
        <div className="mt-8">
          <form id="profileForm">
            <div className="mt-4">
              <label htmlFor="fullname">Nom complet: </label>
              <input type="text" name="fullname" className="focus:border rounded-lg" value={userInfos.fullname} />
            </div>

            <div className="mt-4">
              <label htmlFor="fullname">Adresse electronique: </label>
              <input type="text" name="fullname" className="focus:border rounded-lg" value={userInfos.fullname} />
            </div>

            <div>
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  color="registeBtnTheme"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  <Box
                    color="white">
                    Enregistrer
                  </Box>
                </Button>
              </ThemeProvider>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>;
}