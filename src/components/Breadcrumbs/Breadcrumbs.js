import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';



const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0',
        padding: '1rem',
    },
    link: {
        display: 'flex',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));



const Breadcrumbs = props => {

    const { history, location: { pathname } } = props
    const classes = useStyles();
    const pathnames = pathname.split('/').filter(x => x);

    const breadcrumbNameMap = {
        '/novedadesPersonal': 'Novedades del Personal',
        '/listadoAlmacen': 'Listado de Almacen',
        '/rutinas': 'Listado de Rutinas',
        '/tareasDiarias': 'Tareas Diarias',
        '/rutinas/rutinasDetalles': 'Detalle de Rutina',
        '/parosDePlanta': 'Paros de Planta',
        '/parosDePlanta/tareasParoDePlanta': 'Tareas Paro de Planta',
        '/parosDePlanta/tareasParoDePlantaSinAsignar': 'Tareas Paro de Planta sin asignar',
        '/vacacionesPersonal': 'Vacaciones del Personal',
        '/almacen': 'Almacen',
        '/itemsAlmacen': 'Stock Almacén',
        '/itemsTaller': 'Stock Taller',
        '/reclamosStock': 'Reclamos de Stock',
        '/personal': 'Personal',
    };

    return (
        <div className={classes.container}>
            <MUIBreadcrumbs separator="›" aria-label="breadcrumb">
                {pathnames.length > 0 ? (
                    <Link color="inherit" onClick={() => history.push('/')} className={classes.link} >
                        <HomeIcon className={classes.icon} />
                        Home
                    </Link>
                ) : (
                    <Typography color="inherit">
                        <HomeIcon className={classes.icon} />
                        Home
                    </Typography>
                )}
                {pathnames.map((pathname, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Typography color="textPrimary" key={pathname}> {breadcrumbNameMap[routeTo]} </Typography>
                    ) : (
                        <Link color="inherit" key={pathname} onClick={() => history.push(routeTo)} className={classes.link}>{breadcrumbNameMap[routeTo]}</Link>
                    );
                })}
            </MUIBreadcrumbs >
        </div>
    );
};

export default withRouter(Breadcrumbs);