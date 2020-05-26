<?php


namespace App\Controller;


use App\Entity\Actor;
use App\Form\ActorType;
use App\Repository\CategoryRepository;
use App\Repository\SubCategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     * @Route("/ville/{ville}", name="home_ville")
     */
    public function home($ville="null", CategoryRepository $categoryRepository)
    {
        // get every categories
        $categories = $categoryRepository->findAll();
        $result = $categories;

        // get the city by form
        if(isset($_POST['city-submit'])){

            $ville = str_replace(' ','+',$_POST['city']);

            return $this->redirectToRoute('home_ville',[
                'ville' => $ville
            ]);
        }

        // get the center
        if($ville === 'null'){
            $center = [];
        }else{
            $adress = str_replace(' ','+',$ville);
            $geocoder = "https://api-adresse.data.gouv.fr/search/?q=".$adress;

            $decode = json_decode(file_get_contents($geocoder));

            $local_latitude = $decode->features[0]->geometry->coordinates[1];
            $local_longitude = $decode->features[0]->geometry->coordinates[0];
            $center = [$local_latitude, $local_longitude];
        }




        return $this->render('home.html.twig',[
            'result' => $result,
            'center' => $center
        ]);
    }

    /**
     * @Route("/ajout", name="add")
     */
    public function ajout(Request $request, EntityManagerInterface $entityManager)
    {
        $actor = new Actor();
        $form = $this->createForm(ActorType::class, $actor);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){


            $adress = $request->request->get('actor')['address'];

            $adress = str_replace(' ','+',$adress);
            $geocoder = "https://api-adresse.data.gouv.fr/search/?q=".$adress;

            $decode = json_decode(file_get_contents($geocoder));

            $local_latitude = $decode->features[0]->geometry->coordinates[1];
            $local_longitude = $decode->features[0]->geometry->coordinates[0];

            $actor->setLatitude($local_latitude);
            $actor->setLongitude($local_longitude);

            $entityManager->persist($actor);
            $entityManager->flush();

            return $this->redirectToRoute('add');

        }

        return $this->render('add.html.twig',[
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/ajax", name="ajax")
     */
    public function ajax(CategoryRepository $categoryRepository)
    {
        // ajax + return a JSON
        // get the lat and long from center view
        $center = $_POST['center'];
        $latMax = $center[0]+0.01;
        $latMin = $center[0]-0.01;
        $lngMax = $center[1]+0.01;
        $lngMin = $center[1]-0.01;
        $result = [];

        // every catgories
        $categories = $categoryRepository->findAll();
        foreach($categories as $category){
            foreach($category->getSubCategory() as $subCategories){
                foreach($subCategories->getActor() as $actor){
                    if($actor->getLatitude() < $latMax && $actor->getLatitude()> $latMin){
                        if($actor->getLongitude()<$lngMax && $actor->getLongitude()>$lngMin){
                            $result[] = $actor;
                        }

                    }
                }
            }
        }

        //get the selector
        //$selector = [];


        return new Response(json_encode($result));








    }

}