# Cv

Angular standalone app to build and display my CV, in combination with a data.json file located at "src/assets".
The purpose of this app is only to be run locally, and not to be deployed to a server. After that use the functionalities to download the CV in PDF format.
The generated PDF is able to handle the links and the images that are in the CV.

## Setup & Run

1. Run the following command to install the dependencies:
```bash npm ci```
2. Add a `data.json` file at `src/assets`. There is an example file `data-sample.json` that you can use as a template.
3. Run the following command to start the app:
```bash npm start```
4. Open your browser and navigate to `http://localhost:4200/`

## CI/CD

A GitHub Actions workflow is set up to run the app and start the python script `download_pdf.py` to download the CV in PDF format.
The python script will use Selenium to open the app in a headless browser and click the download button.
The PDF file is sent to an address mail that is defined in the CI/CD variables.

