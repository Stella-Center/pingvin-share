import {
  Box,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Paper,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import useConfig from "../../hooks/config.hook";
import useUser from "../../hooks/user.hook";
import useTranslate from "../../hooks/useTranslate.hook";
import Logo from "../Logo";
import ActionAvatar from "./ActionAvatar";
import NavbarShareMenu from "./NavbarShareMenu";
import { TbUpload } from "react-icons/tb";

const HEADER_HEIGHT = 60;

type NavLink = {
  link?: string;
  label?: string;
  component?: ReactNode;
  action?: () => Promise<void>;
};

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
    backgroundColor: "#F3F3F3",
    boxShadow: "0px 4px 7.1px 0px #0000001A",
    border: "none",
    svg: {
      color: "#9E9E9E",
    },
  },
  control: {
    padding: "10px 30px",
    backgroundColor: "#2D6AB5 !important",
    height: "33px",
    border: "1px solid #9E9E9E",
    cursor: "pointer",
  },
  logoText: {
    lineHeight: "10px",
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",
    backgroundColor: "#F3F3F3",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    backgroundColor: "#2D6AB5",
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "#9E9E9E",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
    },
  },
}));

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const config = useConfig();
  const { classes, cx } = useStyles();
  const t = useTranslate();

  const [opened, toggleOpened] = useDisclosure(false);

  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  const authenticatedLinks: NavLink[] = [
    {
      label: t("navbar.upload"),
      component: (
        <Link href={"/upload"}>
          <Button
            className={classes.control}
            variant="filled"
            size="sm"
            radius="xl"
          >
            {t("navbar.upload")}
          </Button>
        </Link>
      ),
    },
    {
      component: <NavbarShareMenu />,
    },
    {
      component: <ActionAvatar />,
    },
  ];

  let unauthenticatedLinks: NavLink[] = [
    // {
    //   link: "/auth/signIn",
    //   label: t("navbar.signin"),
    // },
  ];

  if (config.get("share.allowUnauthenticatedShares")) {
    unauthenticatedLinks.unshift({
      link: "/upload",
      label: t("navbar.upload"),
    });
  }

  if (config.get("general.showHomePage"))
    unauthenticatedLinks.unshift({
      link: "/",
      label: t("navbar.home"),
    });

  if (config.get("share.allowRegistration"))
    unauthenticatedLinks.push({
      link: "/auth/signUp",
      label: t("navbar.signup"),
    });

  const items = (
    <>
      {(user ? authenticatedLinks : unauthenticatedLinks).map((link, i) => {
        if (link.component) {
          return (
            <Box pl={5} py={15} key={i}>
              {link.component}
            </Box>
          );
        }
        return (
          <Link
            key={link.label}
            href={link.link ?? ""}
            onClick={() => toggleOpened.toggle()}
            className={cx(classes.link, {
              [classes.linkActive]: currentRoute == link.link,
            })}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
  return (
    <MantineHeader height={HEADER_HEIGHT} mb={40} className={classes.root}>
      <Container className={classes.header}>
        <Link href="/" passHref>
          <Group align={"flex-end"} spacing={8}>
            <Logo height={"27px"} width={"100px"} />
            <Text weight={500} color={"#000000"} className={classes.logoText}>
              Share
            </Text>
          </Group>
        </Link>
        <Group spacing={5} className={classes.links}>
          <Group>{items} </Group>
        </Group>
        <Burger
          opened={opened}
          onClick={() => toggleOpened.toggle()}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              className={classes.dropdown}
              withBorder
              style={{ ...styles, backgroundColor: "#F3F3F3" }}
            >
              <Stack style={{ backgroundColor: "#F3F3F3" }} spacing={0}>
                {items}
              </Stack>
            </Paper>
          )}
        </Transition>
      </Container>
    </MantineHeader>
  );
};

export default Header;
