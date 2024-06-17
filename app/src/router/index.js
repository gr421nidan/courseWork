// app/src/router/index.js
import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserRegistrations from "@/components/guest/UserRegistrations.vue";
import UserAuthorization from "@/components/guest/UserAuthorization.vue";
import UserFeedback from "@/components/user/UserFeedback.vue";
import AboutTour from "@/components/guest/AboutTour.vue";
import ToursListInRegions from "@/components/guest/ToursListInRegion.vue";
import UserCabinet from "@/components/user/UserCabinet.vue";
import BookingTour from "@/components/user/BookingTour.vue";
import ToursListAdmin from "@/components/admin/ToursListAdmin.vue";
import AboutTourAdmin from "@/components/admin/AboutTourAdmin.vue";
import RegionsList from "@/components/admin/RegionsList.vue";
import AboutGuid from "@/components/admin/AboutGuid.vue";
import HotelsList from "@/components/admin/HotelsList.vue";
import BookingToursList from "@/components/admin/BookingToursList.vue";
import AboutBookingTour from "@/components/admin/AboutBookingTour.vue";
import GuidsList from "@/components/admin/GuidsList.vue";
import ToursList from "@/components/guest/ToursList.vue";
import store from "../store";
import AboutHotel from "@/components/admin/AboutHotel.vue";
import EmailConfirm from "@/components/user/EmailConfirm.vue";

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/login");
};
const ifAdmin = (to, from, next) => {
    if (store.getters.isAdmin) {
        next();
        return;
    }
    next("/login");
};

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/register",
        name: "register",
        component: UserRegistrations,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: "/login",
        name: "login",
        component: UserAuthorization,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: "/confirm",
        name: "emailConfirm",
        component: EmailConfirm,
    },
    {
        path: "/tours",
        name: "tours",
        component: ToursList,
    },
    {
        path: "/tour/:id",
        name: "aboutTour",
        component: AboutTour,
        props: (route) => ({id: Number(route.params.id)}),
    },
    {
        path: "/feedback/create/:id",
        name: "feedbackCreate",
        component: UserFeedback,
        beforeEnter: ifAuthenticated,
        props: (route) => ({id: Number(route.params.id)}),
    },
    {
        path: "/region/:id",
        name: "tourInRegion",
        component: ToursListInRegions,
        props: (route) => ({id: Number(route.params.id)}),
    },
    {
        path: "/user/me",
        name: "cabinet",
        component: UserCabinet,
        beforeEnter: ifAuthenticated,
    },
    {
        path: "/booked/create/:id",
        name: "bookingTour",
        component: BookingTour,
        beforeEnter: ifAuthenticated,
        props: (route) => ({id: Number(route.params.id)}),
    },
    {
        path: "/admin/tours",
        name: "tours-admin",
        component: ToursListAdmin,
        beforeEnter: ifAdmin,
    },
    {
        path: "/admin/tours/:id",
        name: "AboutTour",
        component: AboutTourAdmin,
        beforeEnter: ifAdmin,
        props: (route) => ({id: Number(route.params.id)}),
    },
    {
        path: "/admin/regions",
        name: "regions",
        component: RegionsList,
        beforeEnter: ifAdmin,
    },
    {
        path: "/admin/guids",
        name: "guids",
        component: GuidsList,
        beforeEnter: ifAdmin,
    },
    {
        path: "/admin/guide/:id",
        name: "AboutGuide",
        component: AboutGuid,
        beforeEnter: ifAdmin,
        props: (route) => ({id: Number(route.params.id)}),
    },
    {
        path: "/admin/hotels",
        name: "hotels",
        component: HotelsList,
        beforeEnter: ifAdmin,
    },
    {
        path: "/admin/hotels/:id",
        name: "AboutHotel",
        component: AboutHotel,
        beforeEnter: ifAdmin,
        props: (route) => ({id: Number(route.params.id)}),
    },
    {
        path: "/admin/booking/tours",
        name: "booking-tours",
        component: BookingToursList,
        beforeEnter: ifAdmin,
    },
    {
        path: "/admin/booked/:id",
        name: "AboutApplication",
        component: AboutBookingTour,
        beforeEnter: ifAdmin,
        props: (route) => ({id: Number(route.params.id)}),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;
