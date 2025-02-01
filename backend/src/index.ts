import app from "./server";
const PORT =  Number(process.env.PORT) || 3000

app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running on the port ${PORT}`);
})

export default app;