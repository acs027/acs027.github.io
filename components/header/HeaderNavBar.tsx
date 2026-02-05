import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useThemeColors } from "../utils/useThemeColors";
import { ThemedView } from "../utils/ThemedView";
import { ThemedText } from "../utils/ThemedText";
import { Feather, Ionicons } from "@expo/vector-icons"; 
import { useTranslation } from "react-i18next";
import i18n from "@/src/i18n";

type HeaderNavBarProps = {
  currentSection: string;
  onNavigate: (section: string) => void;
};

export default function HeaderNavBar({ onNavigate, currentSection }: HeaderNavBarProps) {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);

  const isSmall = width < 850;

  const tabs = [
    { key: "about", label: t("navbar.tabs.about") },
    
    { key: "projects", label: t("navbar.tabs.projects") },
    { key: "contributions", label: t("navbar.tabs.contributions") },
    { key: "skills", label: t("navbar.tabs.skills") },
    { key: "contact", label: t("navbar.tabs.contact") },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    // We use a transparent container to allow the backdrop-filter (blur) to work on Web
    <View style={[styles.outerWrapper, { borderBottomColor: colors.borderColor || 'rgba(255,255,255,0.1)' }]}>
      <View style={styles.container}>
        
        {/* Logo Section */}
        <Pressable onPress={() => onNavigate("about")}>
          <Text style={[styles.logo, { color: '#0A84FF' }]}>{t("navbar.logo")}</Text>
        </Pressable>

        {/* Desktop Navigation */}
        {!isSmall && (
          <View style={styles.desktopNav}>
            {tabs.map((tab) => {
              const isActive = currentSection === tab.key;
              return (
                <Pressable key={tab.key} onPress={() => onNavigate(tab.key)} style={styles.navPressable}>
                  <ThemedText style={[styles.navLink, isActive && styles.activeNavLink]}>
                    {tab.label}
                  </ThemedText>
                  {isActive && <View style={styles.activeIndicator} />}
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Right Side Tools */}
        <View style={styles.rightTools}>
          <Pressable onPress={toggleLanguage} style={styles.langSwitch}>
            <Ionicons name="language" size={16} color="white" style={{ marginRight: 4 }} />
            <Text style={styles.langText}>{i18n.language.toUpperCase()}</Text>
          </Pressable>

          {isSmall && (
            <Pressable 
              onPress={() => setMenuOpen(!menuOpen)}
              style={[styles.menuButton, { backgroundColor: menuOpen ? 'rgba(255,255,255,0.1)' : 'transparent' }]}
            >
              <Feather name={menuOpen ? "x" : "menu"} size={24} color={colors.text} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Mobile Dropdown (Apple Settings Style) */}
      {isSmall && menuOpen && (
        <ThemedView style={styles.mobileMenu} color={colors.card}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.key}
              style={styles.mobileMenuItem}
              onPress={() => {
                onNavigate(tab.key);
                setMenuOpen(false);
              }}
            >
              <ThemedText style={[
                styles.mobileMenuText, 
                currentSection === tab.key && { color: '#0A84FF', fontWeight: '700' }
              ]}>
                {tab.label}
              </ThemedText>
              <Feather name="chevron-right" size={18} color="#8E8E93" />
            </Pressable>
          ))}
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    position: Platform.OS === 'web' ? 'fixed' : 'relative',
    top: 0,
    width: '100%',
    zIndex: 1000,
    borderBottomWidth: 1,
    // iOS Glass effect for Web
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(28, 28, 30, 0.7)',
      },
      default: {
        backgroundColor: '#1C1C1E',
      }
    }),
  },
  container: {
    height: 64,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -1,
  },
  desktopNav: {
    flexDirection: 'row',
    gap: 32,
    position: 'absolute',
    left: '50%',
    transform: Platform.OS === 'web' ? [{ translateX: '-50%' }] : [],
  },
  navPressable: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  navLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
  },
  activeNavLink: {
    color: "#FFF",
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0A84FF',
  },
  rightTools: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  langSwitch: {
    flexDirection: 'row',
    backgroundColor: '#0A84FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  langText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '800',
  },
  menuButton: {
    padding: 6,
    borderRadius: 8,
  },
  mobileMenu: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  mobileMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  mobileMenuText: {
    fontSize: 17,
    fontWeight: '500',
  }
});